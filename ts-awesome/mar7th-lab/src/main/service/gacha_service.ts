import { app, BrowserWindow, dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import configService from './config_service';
import settingsService from './settings_service';

// userDataDir 用户数据目录
// └── volumeDir 数据卷目录
//     ├── appSettingsPath 配置文件
//     ├── achievementDir 成就目录
//     │   ├── uids.json
//     │   ├── 000000000.json
//     │   └── 137780448.json
//     └── gachaDir 跃迁目录
//         ├── uids.json
//         ├── 000000000.json
//         └── 137780448.json

function loadJson(fileName: string) {
  // todo 确定 json 文件路径
  console.log(__dirname);
  return JSON.parse(fs.readFileSync(path.join(__dirname, `../static/json/${fileName}.json`), 'utf-8'));
}

class GachaService {
  volumeDir: string;
  gachaDir: string;
  gachaUidsPath: string;
  //! gachaUids: uid => username
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gachaUids: Record<string, string>;

  constructor() {
    this.volumeDir = configService.getVolumeDir();
    this.gachaDir = path.join(this.volumeDir, './gacha/');
    if (!fs.existsSync(this.gachaDir)) {
      fs.mkdirSync(this.gachaDir);
    }
    this.gachaUidsPath = path.join(this.gachaDir, './uids.json');
    if (!fs.existsSync(this.gachaUidsPath)) {
      fs.writeFileSync(this.gachaUidsPath, JSON.stringify({ '000000000': 'Trailblazer' }, null, 2), 'utf-8');
      fs.writeFileSync(path.join(this.gachaDir, './000000000.json'), JSON.stringify({}, null, 2), 'utf-8');
    }
    this.gachaUids = JSON.parse(fs.readFileSync(this.gachaUidsPath, 'utf-8'));
  }

  saveGachaUids() {
    this.gachaUids = Object.keys(this.gachaUids)
      .sort()
      .reduce((sortedObj, key) => {
        sortedObj[key] = this.gachaUids[key];
        return sortedObj;
      }, {});
    fs.writeFileSync(this.gachaUidsPath, JSON.stringify(this.gachaUids, null, 2), 'utf-8');
  }

  public async getGachaUids() {
    return { msg: 'OK', data: this.gachaUids };
  }

  public async getGachaData(uid: string, updateLastGachaUid = false) {
    if (!/^\d{9}$/.test(uid)) {
      return { msg: 'Invalid UID' };
    }
    if (this.gachaUids[uid] === undefined) {
      return { msg: 'UID not found' };
    }
    if (updateLastGachaUid) {
      settingsService.setAppSettings('LastGachaUid', uid);
    }
    return {
      msg: 'OK',
      data: JSON.parse(fs.readFileSync(path.join(this.gachaDir, `./${uid}.json`), 'utf-8')),
    };
  }

  public async addGachaData(uid: string, username: string) {
    if (!/^\d{9}$/.test(uid)) {
      return { msg: 'Invalid UID' };
    }
    if (this.gachaUids[uid] === undefined) {
      fs.writeFileSync(path.join(this.gachaDir, `./${uid}.json`), JSON.stringify({}, null, 2), 'utf-8');
    }
    this.gachaUids[uid] = username;
    this.saveGachaUids();
    return { msg: 'OK' };
  }

  public async removeGachaData(uid: string) {
    if (!/^\d{9}$/.test(uid)) {
      return { msg: 'Invalid UID' };
    }
    if (this.gachaUids[uid] === undefined || Object.keys(this.gachaUids).length === 1) {
      return { msg: 'UID not found' };
    }
    delete this.gachaUids[uid];
    this.saveGachaUids();
    return { msg: 'OK' };
  }

  /**
   *
   * @link https://uigf.org/zh/standards/srgf.html
   */
  public async exportGachaData(uid: string | string[], type = 'srgf_v1.0') {
    if (type === 'srgf_v1.0' && !Array.isArray(uid)) {
      if (!/^\d{9}$/.test(uid)) {
        return { msg: 'Invalid UID' };
      }
      if (this.gachaUids[uid] === undefined || Object.keys(this.gachaUids).length === 1) {
        return { msg: 'UID not found' };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exportData: { info: any; list: any[] } = {
        info: {
          srgf_version: 'v1.0',
          uid: `${uid}`,
          lang: 'zh-cn',
          region_time_zone: 8,
          export_app: 'mar7th-lab',
          export_app_version: app.getVersion(),
          export_timestamp: Math.floor(new Date().getTime() / 1000),
        },
        list: [],
      };
      const avatarConfig = loadJson('AvatarConfig');
      const equipmentConfig = loadJson('EquipmentConfig');
      const textMapCHS = loadJson('TextMapCHS');
      Object.values(
        JSON.parse(fs.readFileSync(path.join(this.gachaDir, `./${uid}.json`), 'utf-8'))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).forEach((item: any) => {
        // todo 注释下一行
        console.log(item);
        item['count'] = '1';
        if (item['item_id'].length === 4) {
          item['item_type'] = '角色';
          item['name'] = textMapCHS[avatarConfig[item['item_id']]['AvatarName']['Hash']];
          item['rank_type'] = avatarConfig[item['item_id']]['Rarity'].at(-1);
        } else {
          item['item_type'] = '光锥';
          item['name'] = textMapCHS[equipmentConfig[item['item_id']]['EquipmentName']['Hash']];
          item['rank_type'] = equipmentConfig[item['item_id']]['Rarity'].at(-1);
        }
        exportData['list'].push(item);
      });
      let msg = 'OK';
      try {
        await dialog
          .showSaveDialog(BrowserWindow.getAllWindows()[0], {
            title: '导出跃迁记录',
            buttonLabel: '导出',
            defaultPath: path.join(app.getPath('desktop'), `Mar7thLab_GachaExport_v${app.getVersion()}_${this.gachaUids[uid]}_${uid}.SRGF.json`),
            filters: [{ name: 'SRGF json', extensions: ['json'] }],
          })
          .then((value) => {
            if (value.canceled) {
              msg = 'Canceled';
            } else {
              fs.writeFileSync(value.filePath, JSON.stringify(exportData, null, 2), 'utf-8');
            }
          })
          .catch((reason) => {
            msg = reason.message;
          });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return { msg: err.message };
      }
      return { msg: msg };
    } else if (type === 'uigf_v4.0') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exportData: { info: any; hkrpg: any[] } = {
        info: {
          export_app: 'mar7th-lab',
          export_app_version: app.getVersion(),
          export_timestamp: Math.floor(new Date().getTime() / 1000),
          version: 'v4.0',
        },
        hkrpg: [],
      };
      const avatarConfig = loadJson('AvatarConfig');
      const equipmentConfig = loadJson('EquipmentConfig');
      const textMapCHS = loadJson('TextMapCHS');
      const uidArr = Array.isArray(uid) && uid.length > 0 ? [uid] : Object.keys(this.gachaUids);
      uidArr.forEach((uid) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uidLangTzList: { uid: string; lang: string; timezone: number; list: any } = {
          uid: `${uid}`,
          lang: 'zh-cn',
          timezone: 8,
          list: [],
        };
        Object.values(
          JSON.parse(fs.readFileSync(path.join(this.gachaDir, `./${uid}.json`), 'utf-8'))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).forEach((item: any) => {
          item['count'] = '1';
          if (item['item_id'].length === 4) {
            item['item_type'] = '角色';
            item['name'] = textMapCHS[avatarConfig[item['item_id']]['AvatarName']['Hash']];
            item['rank_type'] = avatarConfig[item['item_id']]['Rarity'].at(-1);
          } else {
            item['item_type'] = '光锥';
            item['name'] = textMapCHS[equipmentConfig[item['item_id']]['EquipmentName']['Hash']];
            item['rank_type'] = equipmentConfig[item['item_id']]['Rarity'].at(-1);
          }
          uidLangTzList.list.push(item);
        });
        exportData.hkrpg.push(uidLangTzList);
      });

      let msg = 'OK';
      try {
        await dialog
          .showSaveDialog(BrowserWindow.getAllWindows()[0], {
            title: '导出跃迁记录',
            buttonLabel: '导出',
            defaultPath: path.join(app.getPath('desktop'), `gacha_export_v${app.getVersion()}.UIGF.json`),
            filters: [{ name: 'UIGF json', extensions: ['json'] }],
          })
          .then((result) => {
            if (result.canceled) {
              msg = 'Canceled';
            } else {
              fs.writeFileSync(result.filePath, JSON.stringify(exportData, null, 2), 'utf-8');
            }
          })
          .catch((err) => {
            msg = err.message;
          });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return { msg: err.message };
      }
      return { msg: msg };
    } else {
      return { msg: 'Unknown type' };
    }
  }

  /**
   *
   * @link https://uigf.org/zh/standards/srgf.html
   */
  public async importGachaData(type = 'srgf_v1.0', data = {}) {
    if (Object.keys(data).length === 0) {
      if (type === 'srgf_v1.0') {
        let msg = 'OK';
        try {
          await dialog
            .showOpenDialog(BrowserWindow.getAllWindows()[0], {
              title: '导入跃迁记录',
              buttonLabel: '导入',
              defaultPath: app.getPath('desktop'),
              filters: [{ name: 'SRGF json', extensions: ['json'] }],
            })
            .then((value) => {
              if (value.canceled) {
                msg = 'Canceled';
              } else {
                data = JSON.parse(fs.readFileSync(value.filePaths[0], 'utf-8'));
              }
            })
            .catch((reason) => {
              msg = reason.message;
            });
          if (msg !== 'OK') {
            return { msg: msg };
          }
          if (data['info']['srgf_version'] !== 'v1.0') {
            return { msg: 'Unsupport SRGF version' };
          }
          if (data['list'] === undefined) {
            return { msg: 'No data' };
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          return { msg: err.message };
        }
      } else if (type === 'uigf_v4.0') {
        let msg = 'OK';
        let uid = '';
        try {
          await dialog
            .showOpenDialog(BrowserWindow.getAllWindows()[0], {
              title: '导入跃迁记录',
              buttonLabel: '导入',
              defaultPath: app.getPath('desktop'),
              filters: [{ name: 'UIGF json', extensions: ['json'] }],
            })
            .then((value) => {
              if (value.canceled) {
                msg = 'Canceled';
              } else {
                data = JSON.parse(fs.readFileSync(value.filePaths[0], 'utf-8'));
              }
            })
            .catch((reason) => {
              msg = reason.message;
            });
          if (msg !== 'OK') {
            return { msg: msg };
          }
          if (data['info']['version'] !== 'v4.0') {
            return { msg: 'Unsupport UIGF version' };
          }
          if (data['hkrpg'] === undefined || data['hkrpg'].length === 0) {
            return { msg: 'No data' };
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data['hkrpg'].forEach((uidLangTzList: any) => {
            if (!/^\d{9}$/.test(uidLangTzList['uid'])) {
              throw new Error('Invalid UID');
            }
            if (uidLangTzList['list'] === undefined) {
              throw new Error('Invalid UIGF');
            }
            if (uidLangTzList['timezone'] === undefined) {
              throw new Error('Invalid UIGF');
            }
            const itemKeys = ['gacha_id', 'gacha_type', 'item_id', 'time', 'id'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            uidLangTzList['list'].forEach((item: any) => {
              itemKeys.forEach((key) => {
                if (item[key] === undefined) {
                  throw new Error('Invalid UIGF');
                }
              });
            });
          });
          /////////////////////////////
          //! uigf_v4.0 => srgf_v1.0
          /////////////////////////////
          for (const uidLangTzList of data['hkrpg']) {
            const srgfData = {
              info: {
                region_time_zone: uidLangTzList['timezone'],
                uid: uidLangTzList['uid'],
              },
              list: uidLangTzList['list'],
            };
            await this.importGachaData('srgf_v1.0', srgfData);
            uid = uidLangTzList['uid'];
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          return { msg: err.message };
        }
        return { msg: 'OK', data: { uid: uid } };
      }
    }
    const uid = data['info']['uid'];
    if (!/^\d{9}$/.test(uid)) {
      return { msg: 'Invalid UID' };
    }
    if (this.gachaUids[uid] === undefined) {
      fs.writeFileSync(path.join(this.gachaDir, `./${uid}.json`), JSON.stringify({}, null, 2), 'utf-8');
      this.gachaUids[uid] = 'Trailblazer';
      fs.writeFileSync(path.join(this.gachaDir, './uids.json'), JSON.stringify(this.gachaUids, null, 2), 'utf-8');
    }
    // 存储北京时间
    if (data['info']['region_time_zone'] != 8) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data['list'].forEach((item: any) => {
        const itemDate = new Date(item['time']);
        itemDate.setHours(itemDate.getHours() - data['info']['region_time_zone'] + 8);
        item['time'] = `${itemDate.getFullYear()}-` + `0${itemDate.getMonth() + 1}-`.slice(-3) + `0${itemDate.getDate()} `.slice(-3) + `0${itemDate.getHours()}:`.slice(-3) + `0${itemDate.getMinutes()}:`.slice(-3) + `0${itemDate.getSeconds()}`.slice(-2);
      });
    }
    let list = JSON.parse(fs.readFileSync(path.join(this.gachaDir, `./${uid}.json`), 'utf-8'));
    let isInvalid = false;
    const itemKeys = ['gacha_id', 'gacha_type', 'item_id', 'time', 'id'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data['list'].forEach((item: any) => {
      if (list[item['id']] === undefined) {
        const tmp = {};
        itemKeys.forEach((key) => {
          if (item[key] === undefined) {
            isInvalid = true;
          } else {
            tmp[key] = item[key];
          }
        });
        list[item['id']] = tmp;
      }
    });
    if (isInvalid) {
      return { msg: 'Invalid data' };
    }
    list = Object.fromEntries(Object.entries(list).sort());
    fs.writeFileSync(path.join(this.gachaDir, `./${uid}.json`), JSON.stringify(list, null, 2), 'utf-8');
    // todo 完成 settingsService
    settingsService.setAppSettings('LastGachaUid', uid);
    return { msg: 'OK', data: { uid: uid } };
  }

  public async getGachaURL(server = 'cn') {
    let url = '';
    if (server === 'cn') {
      // const playerLogPath = path.join(this.volumeDir, '../../../LocalLow/miHoYo/崩坏：星穹铁道/Player.log')
      const playerLogPath = `${app.getPath('home')}/AppData/LocalLow/miHoYo/崩坏：星穹铁道/Player.log`;
      const starRailDataDir = fs.readFileSync(playerLogPath, 'utf-8').match(/Loading player data from (.*)data\.unity3d/)![1];
      // console.log(starRailDataDir)
      const webCachesDir = path.join(starRailDataDir, './webCaches/');
      let maxVersion = '0.0.0.0';
      fs.readdirSync(webCachesDir).forEach((fileName) => {
        if (fs.statSync(path.join(webCachesDir, fileName)).isDirectory() && /\d+\.\d+\.\d+\.\d/.test(fileName)) {
          const maxNums = maxVersion.split('.');
          const curNums = fileName.split('.');
          for (let i = 0; i < 4; ++i) {
            if (Number.parseInt(curNums[i]) > Number.parseInt(maxNums[i])) {
              maxVersion = fileName;
              break;
            }
            if (Number.parseInt(curNums[i]) < Number.parseInt(maxNums[i])) {
              break;
            }
          }
        }
      });
      if (maxVersion === '0.0.0.0') {
        return { msg: 'URL not found' };
      }
      const urlWebCachesPath = path.join(starRailDataDir, `./webCaches/${maxVersion}/Cache/Cache_Data/data_2`);
      // todo 获取 url
      /////////////////////////////////////////////////////////////////////////
      const urlLines = fs.readFileSync(urlWebCachesPath, 'utf-8').split('1/0/');
      urlLines.forEach((line) => {
        if (line.match(/^http.*(?:hkrpg|api).*mihoyo\.com.*?gacha.*\?/i)) {
          // eslint-disable-next-line no-control-regex
          url = line.match(/^.*?\x00/)![0].slice(0, -1);
        }
      });
      /////////////////////////////////////////////////////////////////////////
      if (url === '') {
        return { msg: 'URL not found' };
      }
      const searchKeys = ['authkey_ver', 'authkey', 'game_biz', 'lang'];
      const urlObj = new URL(url);
      const params = urlObj.searchParams;
      const filteredParams = new URLSearchParams(Array.from(params.entries()).filter(([k]) => searchKeys.includes(k)));
      urlObj.search = filteredParams.toString();
      console.log(urlObj.href);
      return { msg: 'OK', data: { url: urlObj.href } };
    } else {
      return { msg: 'Unsupport server' };
    }
  }
}

export default new GachaService();
