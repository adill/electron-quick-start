// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

function maker(w, h) {
  return new window.ImageData(w, h);
}

const vm = require('vm');

const context = vm.createContext(Object.create(null));
const _requireModule = vm.runInContext(
  `
  var width = 1280;
  var height = 720;

  var id1 = null;
  var id2 = null;

  var oneOrTwo = 1;

  function requireModule(maker) {
    if (id1 == null) {
      id1 = maker(width, height);
    }
    if (id2 == null) {
      id2 = maker(width, height);
    }
    var idata = (oneOrTwo === 1) ? id1 : id2;
    oneOrTwo = (oneOrTwo === 1) ? 2 : 1;

    var data = idata.data;
    var bytes = width * height * 4;
    for (var i = 0; i < bytes; i += 4) {
      data[i+0] = Math.random() * 255;
      data[i+1] = Math.random() * 255;
      data[i+2] = Math.random() * 255;
      data[i+3] = 255;
    }

    return idata;
  }
  requireModule
`,
  context
);

window.getAnotherFrame = function () {
  return _requireModule(maker);
}
