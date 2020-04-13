/**
 * @author linhx <https://github.com/linhx>
 */
const { ipcRenderer } = require('electron');

const $sound = document.getElementById('sound');
const $btnStart = document.getElementById('btnStart');
const $btnPause = document.getElementById('btnPause');
const $idleTime = document.getElementById('idleTime');

ipcRenderer.on('play', () => {
  $sound.play();
});

ipcRenderer.on('stop', () => {
  $sound.load();
});

$btnStart.addEventListener('click', () => {
  let idleTime = 4; // TODO setting env
  try {
    idleTime = Number.parseInt($idleTime.value);
  } catch {
    // do nothing
  }
  
  ipcRenderer.send('start', idleTime);
});

$btnPause.addEventListener('click', () => {
  $sound.load();
  ipcRenderer.send('stop');
});
