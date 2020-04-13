/**
 * @author linhx <https://github.com/linhx>
 */
const { powerMonitor } = require('electron');

const checkingTime = 2000; // ms, TODO env
let intervalId;
let isAlarming = false;

function start (
    win,
    idleTime) {
  intervalId = setInterval(() => {
    if (powerMonitor.getSystemIdleTime() > idleTime) {
      if (!isAlarming) {
        win.webContents.send('play');
      }
      isAlarming = true;
    } else {
      if (isAlarming) {
        win.webContents.send('stop');
      }
      isAlarming = false;
    }
  }, checkingTime);
}

function stop () {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

exports.start = start;
exports.stop = stop;
