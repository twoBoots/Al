const _ = require('lodash');

import {app, BrowserWindow, dialog} from 'electron';

import windows from './windows';

let Windows = {};

function winURL(path) {
    return process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}/${path}`
      : `file://${__dirname}/${path}`;
}

function createWindows() {
  _.forIn(windows, (args, name) => {
    Windows[name] = new BrowserWindow({
      titleBarStyle:  args.titleBarStyle  || 'hidden',
      frame:          args.frame          || false,
      height:         args.height         || 600,
      width:          args.width          || 800
    });

    Windows[name].loadURL(winURL(args.root));

    console.log(winURL(args.root));

    Windows[name].on('closed', () => {
      // probs loss of scope
      Windows[name] = null;
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
