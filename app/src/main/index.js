const _ = require('lodash');
const async = require('async');

import {app, BrowserWindow, dialog, ipcMain} from 'electron';

import os from 'os';

import Windows from './windows';
// import channels from './channels';

const windows = {};

function winURL(path) {
  return process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}/${path}`
      : `file://${__dirname}/${path}`;
}


function createWindows() {

  _.forIn(Windows, (args, name) => {
    windows[name] = new BrowserWindow({
      titleBarStyle: (os.platform() === 'darwin') ? 'default' : 'hidden',
      frame: (os.platform() === 'darwin') ? true : (args.frame || false),
      height: args.height || 600,
      width: args.width || 800
    });

    windows[name].loadURL(winURL(args.root));

    console.log(winURL(args.root));

    windows[name].on('closed', () => {
      // probs loss of scope
      windows[name] = null;
    });
  });
}

app.on('ready', createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


/*
 channels
*/

ipcMain.on('tap', (event, data) => {

});

ipcMain.on('untap', (event, data) => {

});
