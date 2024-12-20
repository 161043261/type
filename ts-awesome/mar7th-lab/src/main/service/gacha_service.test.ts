import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'vitest';

function loadJson(fileName: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `../../static/json/${fileName}.json`), 'utf-8'));
}

// /path/to/mar7th-lab/src/main/service
test('Test__dirname', () => {
  console.log(__dirname);
});

test(
  'Test_getGachaURL',
  async () => {
    let url = '';
    const playerLogPath = `${os.homedir()}/AppData/LocalLow/miHoYo/崩坏：星穹铁道/Player.log`;
    const starRailDataDir = fs.readFileSync(playerLogPath, 'utf-8').match(/Loading player data from (.*)data\.unity3d/)![1];
    console.log(starRailDataDir);
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
      console.log('URL not found');
      return;
    }
    const urlWebCachesPath = path.join(starRailDataDir, `./webCaches/${maxVersion}/Cache/Cache_Data/data_2`);
    // todo 获取 url
    ///////////////////////////////////////////////////////////////////////////
    const urlLines = fs.readFileSync(urlWebCachesPath, 'utf-8').split('1/0/');
    urlLines.forEach((line) => {
      if (line.match(/^http.*(?:hkrpg|api).*mihoyo\.com.*?gacha.*\?/i)) {
        // eslint-disable-next-line no-control-regex
        url = line.match(/^.*?\x00/)![0].slice(0, -1);
      }
    });
    ///////////////////////////////////////////////////////////////////////////
    if (url === '') {
      console.log('URL not found');
      return;
    }
    const searchKeys = ['authkey_ver', 'authkey', 'game_biz', 'lang'];
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    const filteredParams = new URLSearchParams(Array.from(params.entries()).filter(([k]) => searchKeys.includes(k)));
    urlObj.search = filteredParams.toString();
    console.log(urlObj.href);
    // await fetch(urlObj)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
  },
  { timeout: 3000 }
);

test('Test_importGachaData_SRGF', () => {
  const data = loadJson('GachaImport_v1.0.0_Trailblazer_137780448.SRGF');
  const uid = data['info']['uid'];
  if (!/^\d{9}$/.test(uid)) {
    console.log('Invalid UID');
    return;
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
  let list = JSON.parse(
    // 等价于 loadJson(uid)
    fs.readFileSync(`./src/static/json/${uid}.json`, 'utf-8'));
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
    console.log('Invalid data');
    return;
  }
  list = Object.fromEntries(Object.entries(list).sort());
  fs.writeFileSync(`./src/static/json/${uid}.json`, JSON.stringify(list, null, 2), 'utf-8');
});

test('Test_exportGachaData_SRGF', () => {
  const uid = '137780448';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportData: { info: any; list: any[] } = {
    info: {
      srgf_version: 'v1.0',
      uid: uid,
      lang: 'zh-cn',
      region_time_zone: 8,
      export_app: 'mar7th-lab',
      export_app_version: '1.0.0',
      export_timestamp: Math.floor(new Date().getTime() / 1000),
    },
    list: [],
  };
  const avatarConfig = loadJson('AvatarConfig');
  const equipmentConfig = loadJson('EquipmentConfig');
  const textMapCHS = loadJson('TextMapCHS');
  Object.values(
    // 等价于 loadJson(uid)
    JSON.parse(fs.readFileSync(`./src/static/json/${uid}.json`, 'utf-8'))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ).forEach((item: any) => {
    // console.log(item);
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
  fs.writeFileSync(`./src/static/json/GachaExport_v1.0.0_Trailblazer_${uid}.SRGF.json`, JSON.stringify(exportData, null, 2), 'utf-8');
});

test('Test_exportGachaData_uigf', () => {
  const uid = '137780448';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportData: { info: any; hkrpg: any[] } = {
    info: {
      export_app: 'mar7th-lab',
      export_app_version: '1.0.0',
      export_timestamp: Math.floor(new Date().getTime() / 1000),
      version: 'v4.0',
    },
    hkrpg: [],
  };
  const avatarConfig = loadJson('AvatarConfig');
  const equipmentConfig = loadJson('EquipmentConfig');
  const textMapCHS = loadJson('TextMapCHS');
  const uidArr: string[] = Array.isArray(uid) && uid.length > 0 ? uid : Object.keys({ [uid]: uid });
  uidArr.forEach((uid) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hkrpgItem: { uid: string; lang: string; timezone: number; list: any } = {
      uid: `${uid}`,
      lang: 'zh-cn',
      timezone: 8,
      list: [],
    };
    Object.values(
      // 等价于 loadJson(uid)
      JSON.parse(fs.readFileSync(`./src/static/json/${uid}.json`, 'utf-8'))
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
      hkrpgItem.list.push(item);
    });
    exportData.hkrpg.push(hkrpgItem);
  });
  fs.writeFileSync(`./src/static/json/GachaExport_v1.0.0_Trailblazer_${uid}.UIGF.json`, JSON.stringify(exportData, null, 2), 'utf-8');
});
