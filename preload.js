if (window.opener === null) {
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

    console.log('I am running a preload');
    console.log(process.isMainFrame);

    setInterval(() => {
        console.log('polling...');

        for (const popout of window.getPopouts()) {
            let element = popout.document.getElementById('content-here');
            if (element) {
                element.innerText = `I got it from ${popout.name}`;
            }
        }
    }, 1000);

    let popouts = new Map();
    window.registerPopout = function (popout) {
        if (!popout) {
            return;
        }
        popouts.set(popout.name, popout);
    }

    window.getPopouts = function () {
        return popouts.values();
    }
} else {
    window.opener.registerPopout(window);
}
