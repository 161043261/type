import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import path from 'node:path';

// 拷贝静态资源
function copyStatic(src: string, dst: string) {
  fs.mkdirSync(dst, { recursive: true });
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcFilePath = path.join(src, file);
    const dstFilePath = path.join(dst, file);
    const stat = fs.statSync(srcFilePath);
    if (stat.isDirectory()) {
      copyStatic(srcFilePath, dstFilePath);
    } else if (!file.endsWith('.js') && !file.endsWith('.raw.json')) {
      fs.copyFileSync(srcFilePath, dstFilePath);
    }
  }
  return null;
}

// todo
const textMapFiles = ['TextMapCHS.json'];
const hashFiles = ['AchievementData.json', 'AchievementSeries.json', 'AvatarConfig.json', 'EquipmentConfig.json', 'GachaBasicInfo.json'];
function lessenTextMap(textMapFileDir: string, hashFileDir: string) {
  const hashs = new Set<string>();
  hashFiles.forEach((file) => {
    const hashRegex = /"Hash": ?(-?\d+)/gm;
    const hashFileContent = fs.readFileSync(path.join(hashFileDir, file), 'utf-8');
    let match: RegExpExecArray | null;
    while ((match = hashRegex.exec(hashFileContent)) !== null) {
      if (match.index === hashRegex.lastIndex) {
        hashRegex.lastIndex++;
      }
      hashs.add(match[1]);
    }
  });
  textMapFiles.forEach((file) => {
    const oldTextMap = JSON.parse(fs.readFileSync(path.join(textMapFileDir, file), 'utf-8'));
    const newTextMap = {};
    hashs.forEach((hash) => {
      if (hash in oldTextMap) {
        newTextMap[hash] = oldTextMap[hash];
      } else {
        newTextMap[hash] = '';
      }
    });
    fs.writeFileSync(path.join(textMapFileDir, file), JSON.stringify(newTextMap, null, 2));
  });
  return null;
}

// 紧凑 JSON
function compactJson(jsonPath: string) {
  const files = fs.readdirSync(jsonPath);
  for (const file of files) {
    const filePath = path.join(jsonPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      compactJson(filePath);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(JSON.parse(fs.readFileSync(filePath, 'utf-8'))));
    }
  }
  return null;
}

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
    },
    plugins: [copyStatic('src/static', 'dist/static'), lessenTextMap('dist/static/json', 'dist/static/json'), compactJson('dist/static/json'), externalizeDepsPlugin()],
  },
  preload: {
    build: {
      outDir: 'dist/preload',
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    build: {
      outDir: 'dist/renderer',
      assetsInlineLimit: 32768,
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [vue()],
  },
});
