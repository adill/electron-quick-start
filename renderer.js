// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var myCanvas = document.getElementById("pad");
var myContext = myCanvas.getContext("2d");

var width = 1280;
var height = 720;

var id1 = new window.ImageData(width, height);
var id2 = new window.ImageData(width, height);

var oneOrTwo = 1;

function draw(timestamp) {
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

  myContext.putImageData(idata, 0, 0);

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

  // var imgData = ctx.getImageData(10, 10, 50, 50);
  // ctx.putImageData(imgData, 10, 70);
