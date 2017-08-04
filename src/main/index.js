
import {app, BrowserWindow, Menu} from 'electron';
import settings from 'electron-settings';

import os from 'os';
import {spawn} from 'child_process';

import Windows from './windows';
import ChanMan from './modules/ChanMan';
import MenuTemplate from './menu';

const _ = require('lodash');
const async = require('async');

const windows = {};
const channels = new ChanMan(windows);


function winURL(path) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/${path}`
    : `file://${__dirname}/${path}`;
}


function start() {
  async.series([
    setupEvents,
    createWindows
  ], (err, res) => {
    console.log('started.');
  });
}

function doGitCmd(d) {
  console.log('doing git');

  const git = spawn('git', ['rev-parse', 'HEAD']);

  channels.send('git:stdout', 'starting...');

  git.stdout.on('data', (data) => {
    channels.send('git:stdout', data.toString());
  });

  git.stderr.on('data', (data) => {
    channels.send('git:stdout', data.toString());
  });

  git.on('close', (code) => {
    channels.send('git:stdout', `child process exited with code ${code}`);
  });
}


function setupEvents(next) {
  channels.on('app:quit', () => {
    app.quit();
  });

  channels.on('git:cmd', doGitCmd);

  next();
}

/*
  move to settingsMan
*/
let settingsTimer = null;
function saveBounds(window) {
  if(settingsTimer) {
    clearTimeout(settingsTimer);
  }

  settingsTimer = setTimeout(() => {
    settings.set(`${app.getName()}.settings.windows.${window}.bounds`, windows[window].getBounds());
  }, 3000);
}


function createWindows(next) {
  _.forIn(Windows, (args, name) => {
    windows[name] = new BrowserWindow({
      titleBarStyle: (os.platform() === 'darwin') ? 'default' : 'hidden',
      frame: (os.platform() === 'darwin') ? true : (args.frame || false),

      width: settings.get(`${app.getName()}.settings.windows.${name}.bounds.width`) || args.width || 800,
      height: settings.get(`${app.getName()}.settings.windows.${name}.bounds.height`) || args.height || 600,
      x: settings.get(`${app.getName()}.settings.windows.${name}.bounds.x`),
      y: settings.get(`${app.getName()}.settings.windows.${name}.bounds.y`),

      _self: name,
      show: false
    });

    windows[name].loadURL(winURL(args.root));

    console.log(winURL(args.root));

    windows[name].on('closed', () => {
      windows[name] = null;
    });

    windows[name].on('ready-to-show', () => {
      windows[name].show();
      windows[name].focus();
    });

    if(args.saveBounds) {
      windows[name].on('resize', (e, r, b) => {
        saveBounds(name);
      });

      windows[name].on('move', (e, r, b) => {
        saveBounds(name);
      });
    }
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate));

  next();
}

app.on('ready', start);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') { // really?
    app.quit();
  }
});


// is this x-platform?
app.on('activate', () => {
  // if (mainWindow === null) {
  //   createWindows();
  // }
});
