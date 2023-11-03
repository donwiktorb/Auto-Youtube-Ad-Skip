let inscript = document.createElement('script');

inscript.src = chrome.runtime.getURL('main.js');

inscript.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(inscript);
