// renderer.js 由渲染进程执行
// 渲染进程直接访问 node 接口是不可能的
// 解决方法: 使用 ipcMain 和 ipcRenderer 的进程间通信 (IPC)

const info = document.getElementById('info');
info.innerText = `Chrome 版本: v${window.versions.chrome()}
Node.js 版本: v${window.versions.node()}
Electron 版本: v${window.versions.electron()}`;
(async () => {
  const response = await window.versions.ping();
  console.log(response); // pong
})();

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
});

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system();
  document.getElementById('theme-source').innerHTML = 'System';
});
