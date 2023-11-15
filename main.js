(async() => {
        // if (true)
        //     return console.log('YOUTUBE CHANGED SOME STUFF SO WORKING ON FIX') 
        const initObserve = (selector, cb) => {
            let startElem = document.querySelector(selector)

            if (startElem) {
                try {
                    cb(startElem)
                } catch(e) {
                    console.log(e)
                }
            }

            const observer = new MutationObserver(mutations => {
                let elem = document.querySelector(selector)
                if (elem) {
                    try {
                        cb(elem)
                    } catch(e) {
                        console.log(e)
                    }
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        try {
            initObserve('.ytp-ad-skip-button-container', (elem) => {
                elem.click()
                console.log('skipped')
            })
            console.log("SET")
        } catch(e) {
            console.log("Error ", e)
        }
})()