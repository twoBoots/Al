const _ = require('lodash');

import {ipcMain} from 'electron';

class ChannelManager {
  constructor(windows) {
    this.windows = windows;

    this.channels = [];
    this.subscribers = {};
    /* this.subscribers = {
      'window-name': ['channel', 'list']
    } */


    ipcMain.on('tap', (event, data) => {
      console.log(`tap:${event.sender.browserWindowOptions._self}:${data}`);
      this.tap(event.sender.browserWindowOptions._self, data);
    });

    ipcMain.on('untap', (event, data) => {
      console.log(`untap:${event.sender.browserWindowOptions._self}:${data}`);
      this.untap(event.sender.browserWindowOptions._self, data);
    });
  }


  isChan(chan) {
    return _.includes(this.channels, chan);
  }


  on(chan, fn) {
    if(!fn) {return;}

    this.register(chan);

    ipcMain.on(chan, fn);
  }


  off(chan, fn) {
    if(!fn) {
      ipcMain.removeAllListeners(chan);
      return;
    }

    ipcMain.removeListener(chan, fn);
  }


  register(chan) {
    if(this.isChan(chan)) {
      return;
    }

    this.channels.push(chan);
  }


  unregister(chan) {
    _.pull(this.channels, chan);
  }


  tap(subscriber, chan) {
    if(!this.subscribers[subscriber]) {
      this.subscribers[subscriber] = [];
    }

    this.subscribers[subscriber].push(chan);

    this.register(chan);
  }


  untap(subscriber, chan) {
    if(!this.subscribers[subscriber]) {
      return;
    }

    _.pull(this.subscribers[subscriber], chan);
  }


  send(chan, data) {
    let self = this;

    let subs = _.filter(_.keys(self.subscribers), (s) => {
        return _.includes(self.subscribers[s], chan);
    });

    _.each(subs, (sub) => {
      this.windows[sub].webContents.send(chan, data);
    });

    if(chan.split(':').slice(-1)[0] !== '*') { // bcast to wildcards
      this.send([...chan.split(':').splice(-1, 1), '*'].join(':'), data);
    }
  }
}

export default ChannelManager;
