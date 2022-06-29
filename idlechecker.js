/**
 * @author linhx <https://github.com/linhx>
 */
const { powerMonitor } = require('electron');

const checkingTime = 2000; // ms, TODO env
let intervalId;
let isAlarming = false;

/**
 * start interval checking if computer was idle
 * @param {*} win 
 * @param {*} idleTime seconds
 */
function start (
    win,
    idleTime) {
  const idleTimeInMilliseconds = idleTime * 1000;
  const _checkingTime = idleTimeInMilliseconds < checkingTime ? idleTimeInMilliseconds : checkingTime;
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
  }, _checkingTime);
}

function stop () {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

exports.start = start;
exports.stop = stop;
