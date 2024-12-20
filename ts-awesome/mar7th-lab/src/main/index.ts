import { app, BrowserWindow, Tray, Menu, ipcMain, shell } from "electron";
import path from "node:path";
import fs from "node:fs";

import settingsService from "./service/settings_service";
import mar7thLabApi from "../preload/mar7thlab_api.json";
import service from "./service";

// debug
if (!settingsService.getAppSettingsSync()["debug"]) {
  Menu.setApplicationMenu(null);
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

// 禁用硬件加速
app.disableHardwareAcceleration();
// 单例运行
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
}

const createMainWindow = () => {
  if (mainWindow) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 1080,
    minHeight: 720,
    frame: false,
    // resizable: false,
    // fullscreenable: false,
    maximizable: false,
    icon: path.join(__dirname, "../../resources/image/icon.png"),
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: false,
      preload: path.join(__dirname, "../preload/index.js")
    }
  });
  if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.on("close", (ev) => {
    if (!settingsService.getAppSettingsSync()["CloseDirectly"]) {
      ev.preventDefault();
      mainWindow!.hide();
    }
  });
  mainWindow.webContents.on("will-navigate", (detail) => {
    if (!detail.isSameDocument) {
      detail.preventDefault();
      shell.openExternal(detail.url);
    }
  });
  mainWindow.webContents.openDevTools();
};

const switchWindowVisibility = (mainWindow: BrowserWindow) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
};

const createTray = () => {
  if (tray) {
    return;
  }
  tray = new Tray(path.join(__dirname, "../../resources/image/icon.png"));
  tray.setToolTip("Marth 7th Lab");
  tray.on("click", () => {
    mainWindow!.isVisible() ? mainWindow!.focus() : switchWindowVisibility(mainWindow!);
  });
  tray.on("right-click", () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: mainWindow!.isVisible() ? "隐藏主界面" : "显示主界面",
        click: () => switchWindowVisibility(mainWindow!)
      },
      {
        label: "退出",
        click: () => app.exit(0)
      }
    ]);
    tray!.popUpContextMenu(menuConfig);
  });
};

app.on("ready", () => {
  createMainWindow();
  createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  createMainWindow();
  createTray();
});

Object.entries(mar7thLabApi).forEach(([serviceName, funcNames]) => {
  funcNames.forEach((funcName) => {
    ipcMain.handle(`${serviceName}.${funcName}`, async (_ev, ...args) => {
      return await service[serviceName][funcName](...args);
    });
  });
});

ipcMain.on("sendMainWindowMsg", (_ev, msg) => {
  switch (msg) {
    case "close":
      settingsService.getAppSettingsSync()["CloseDirectly"]
        ? app.exit(0)
        : switchWindowVisibility(mainWindow!);
      break;
    case "esc":
      switchWindowVisibility(mainWindow!);
      break;
    case "maxize":
      mainWindow!.isMaximized() ? mainWindow!.unmaximize() : mainWindow!.maximize();
      break;
    case "minize":
      mainWindow!.minimize();
      break;
    case "reload":
      mainWindow!.loadFile("../renderer/index.html");
      break;
  }
});

ipcMain.handle("loadJson", async (_ev, funcName) => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, `../../resources/json/${funcName}.json`), "utf-8")
  );
});
