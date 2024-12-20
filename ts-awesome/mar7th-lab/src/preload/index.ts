// preload 预加载脚本由渲染进程执行, 可以访问 node 接口
// 预加载脚本可以在 BrowserWindow 构造方法的 webPreferences 选项中, 附加到主进程

import { contextBridge, ipcRenderer } from 'electron/renderer';
import { electronAPI } from '@electron-toolkit/preload';
import jsonObj from './mar7thlab_api.json';

function createMar7thLabApi(): unknown {
  const mar7thLabApi = {};
  Object.entries(jsonObj).forEach(([serviceName, funcNames]) => {
    mar7thLabApi[serviceName] = {};
    funcNames.forEach((funcName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mar7thLabApi[serviceName][funcName] = (...args: any[]) => ipcRenderer.invoke(`${serviceName}.${funcName}`, ...args);
    });
  });
  mar7thLabApi['send-msg2main-window'] = (msg: string) => ipcRenderer.send('sendMainWindowMsg', msg);
  mar7thLabApi['load-json'] = (fileName: string) => ipcRenderer.invoke('loadJson', fileName);
  return mar7thLabApi;
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('mar7thLab', createMar7thLabApi());
  } catch (err) {
    console.error(err);
  }
} else {
  window['electron'] = electronAPI;
  window['mar7thLab'] = createMar7thLabApi();
}
