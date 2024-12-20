const fs = require('fs').promises;
const path = require('path');

async function loadJson(fileName) {
  return JSON.parse(
    await fs.readFile(
      path.join(__dirname, `./${fileName}.json`).then((value) => value.toString()),
      'utf-8'
    )
  );
}

async function createAvatarConfig() {
  const avatarConfigArr = await loadJson('AvatarConfig_raw');
  const avatarConfig = {};
  avatarConfigArr.forEach((item) => {
    avatarConfig[item['AvatarID']] = item;
  });
  return fs.writeFile('./AvatarConfig.json', JSON.stringify(avatarConfig, null, 2));
}

async function createEquipmentConfig() {
  const equipmentConfigArr = await loadJson('EquipmentConfig_raw');
  const equipmentConfig = {};
  equipmentConfigArr.forEach((item) => {
    equipmentConfig[item['EquipmentID']] = item;
  });
  return fs.writeFile('./EquipmentConfig.json', JSON.stringify(equipmentConfig, null, 2));
}

(async () => {
  await Promise.all([createAvatarConfig(), createEquipmentConfig()]);
})();
