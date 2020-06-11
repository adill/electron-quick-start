// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var myCanvas = document.getElementById("pad");
var myContext = myCanvas.getContext("2d");

function draw(timestamp) {
  myContext.putImageData(window.getAnotherFrame(), 0, 0);

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

  // var imgData = ctx.getImageData(10, 10, 50, 50);
  // ctx.putImageData(imgData, 10, 70);
