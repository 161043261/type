// renderer 由渲染进程执行
// 渲染进程直接访问 node 接口是不可能的
// 解决方法: 使用 ipcMain 和 ipcRenderer 的进程间通信 (IPC)
