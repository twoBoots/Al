const _ = require('lodash');
const async = require('async');

import {app, BrowserWindow, Menu, ipcMain} from 'electron';

import os from 'os';

import Windows from './windows';
import ChanMan from './modules/ChanMan';
import MenuTemplate from './menu';

const windows = {};
let channels = new ChanMan(windows);


function winURL(path) {
  return process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}/${path}`
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


function setupEvents(next) {
  channels.on('app:quit', () => {
    app.quit();
  });

  next();
}


function createWindows(next) {
  _.forIn(Windows, (args, name) => {
    windows[name] = new BrowserWindow({
      titleBarStyle: (os.platform() === 'darwin') ? 'default' : 'hidden',
      frame: (os.platform() === 'darwin') ? true : (args.frame || false),
      height: args.height || 600,
      width: args.width || 800,

      _self: name
    });

    windows[name].loadURL(winURL(args.root));

    console.log(winURL(args.root));

    windows[name].on('closed', () => {
      // probs loss of scope
      windows[name] = null;
    });
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate));

  next();
}

app.on('ready', start);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // really?
    app.quit();
  }
});


// is this x-platform?
app.on('activate', () => {
  // if (mainWindow === null) {
  //   createWindows();
  // }
});
