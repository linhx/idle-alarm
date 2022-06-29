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

const toggleShowBtns = (isStarted) => {
  if (isStarted) {
    $btnPause.classList.remove("hidden");
    $btnStart.classList.add("hidden");
  } else {
    $btnStart.classList.remove("hidden");
    $btnPause.classList.add("hidden");
  }
}

toggleShowBtns(false);

$btnStart.addEventListener('click', () => {
  let idleTime = 4; // TODO setting env
  try {
    idleTime = Number.parseInt($idleTime.value);
  } catch {
    // do nothing
    alert('Invalid time');
    return;
  }
  
  ipcRenderer.send('start', idleTime);
  toggleShowBtns(true);
});

$btnPause.addEventListener('click', () => {
  $sound.load();
  ipcRenderer.send('stop');
  toggleShowBtns(false);
});
