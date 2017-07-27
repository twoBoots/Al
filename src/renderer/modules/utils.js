

function addInspector() {
  // https://stackoverflow.com/questions/32636750/
  const {remote} = require('electron');
  const {Menu, MenuItem} = require('electron').remote;

  let rightClickPosition = null;

  const menu = new Menu();
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: () => {
      remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y);
    }
  });

  menu.append(menuItem);

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClickPosition = {x: e.x, y: e.y};

    menu.popup(remote.getCurrentWindow());
  }, false);
}

export default {
  load(dev) {

    if(dev) {
      addInspector();
    }
  }
};
