// const _ = require('lodash');

const {ipcRenderer} = require('electron');

class ChannelManager {


  on(chan, fn) {
    this.listen(chan);

    ipcRenderer.on(chan, fn);
  }


  off(chan, fn) {
    this.unlisten(chan);

    if(fn) {
      ipcRenderer.removeListener(chan, fn);
    } else {
      ipcRenderer.removeAllListeners(chan);
    }
  }


  listen(chan) {
    ipcRenderer.send('tap', chan);
  }


  unlisten(chan) {
    ipcRenderer.send('untap', chan);
  }


  send(chan, data) {
    ipcRenderer.send(chan, data);
  }
}

export default ChannelManager;
