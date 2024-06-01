(async () => {
  // if (true)
  //     return console.log('YOUTUBE CHANGED SOME STUFF SO WORKING ON FIX')
  const initObserve = (selector, cb) => {
    let startElem = document.querySelector(selector);

    if (startElem) {
      try {
        cb(startElem);
      } catch (e) {
        console.log(e);
      }
    }

    const observer = new MutationObserver((mutations) => {
      let elem = document.querySelector(selector);
      if (elem) {
        try {
          cb(elem);
        } catch (e) {
          console.log(e);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  try {
    initObserve(".ytp-ad-skip-button-container", (elem) => {
      elem.click();
      console.log("skipped");
    });
    initObserve(" ytp-ad-player-overlay-layout ", (elem) => {
      let btnElem = document.querySelector(".ytp-ad-skip-button-container");
      if (!btnElem) {
        let videoElem = document.getElementsByTagName("video");
        if (videoElem) videoElem = videoElem[0];
        videoElem?.fastSeek(videoElem.duration ?? 4444);
        console.log("skipped");
      }
    });
    console.log("SET");
  } catch (e) {
    console.log("Error ", e);
  }
})();

