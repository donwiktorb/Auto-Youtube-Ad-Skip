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

            window[name] = async (s) => {
                let videoElem = document.getElementById('movie_player')

                if (s === -1 || s == 1) {
                    videoElem.stopVideo()

                    do {
                        await new Promise(r => setTimeout(r, 200));
                        videoElem.seekTo(window.currentVideoTime)

                    } while(videoElem.getCurrentTime() !== window.currentVideoTime)

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
                    window.currentVideoTime = t
                }

                if (func2)
                    func2(t)
            }
            
        } catch(e) {
            console.log(e)
        }
})()