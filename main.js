(async() => {
        
        function getFullFunctionName(name) {
            let found = false

            for (let i in window) {
                if (i.startsWith(name)) {
                    found = i
                }
            }

            return found
        }

        try {
            console.log('waiting for youtube ads to be loaded...')

            do {
                await new Promise(r => setTimeout(r, 200));
                console.log('waiting')

            } while(getFullFunctionName('ytPlayeronAdStateChangeplayer') == false)

            console.log('loaded')

            let name = getFullFunctionName('ytPlayeronAdStateChangeplayer')

            let func = window[name]

            console.log(func, name)

            window.currentVideoTime = 0
            window.showingAd = false
            window.lastUrl = ""

            window[name] = async (s) => {
                console.log("AD STATE CHANGE", s)
                let videoElem = document.getElementById('movie_player')

                if (s === -1 || s == 1) {
                    window.showingAd = true
                    videoElem.stopVideo()
                    if (window.lastUrl === videoElem.getVideoUrl()) {
                        do {
                            await new Promise(r => setTimeout(r, 200));
                            videoElem.seekTo(window.currentVideoTime)

                        } while(videoElem.getCurrentTime() !== window.currentVideoTime)
                    } else {
                        window.lastUrl = videoElem.getVideoUrl()
                        window.currentVideoTime = 0
                    }

                } else {
                    window.showingAd = false
                }
            }

            do {
                await new Promise(r => setTimeout(r, 200));
                console.log('waiting for progress update player')

            } while(getFullFunctionName('ytPlayeronVideoProgressplayer') == false)

            let progressName = getFullFunctionName('ytPlayeronVideoProgressplayer')

            let func2 = window[progressName]

            window[progressName] = (t) => {
                if (t > 5) {
                    console.log("TIME UPDATE", t)
                    window.currentVideoTime = t
                }

                if (func2)
                    func2(t)
            }

            // do {
            //     await new Promise(r => setTimeout(r, 200));
            //     console.log('waiting for player state change')

            // } while(getFullFunctionName('ytPlayeronStateChangeplayer') == false)

            // let stateName = getFullFunctionName('ytPlayeronStateChangeplayer')

            // let func4 = window[stateName]

            // window[stateName] = (s) => {
            //     console.log("PLAYER STATE CHANGE ", s)
            //     // if (s === 2) // 0
            //     //     window.currentVideoTime = 0
            //     if (func4)
            //         func4(s)
            // }
            
        } catch(e) {
            console.log(e)
        }
})()