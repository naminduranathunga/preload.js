/**
 * This script is written by Namindu S. Ranathunga under <Licence>
 * 
 * This script is for preload images easily.
 * call preload(urls, callback); to use it
 *    -  urls as string array of images to load
 *    -  callback function is called each time loading the script.
 *       function calles with 3 arguments
 *          - url  - current url
 *          - progress - progress loading images. if all images are loaded, returns 100
 *          - status  - send "error" or "pass"
 */
var PRELOADURL_LIST = [];
function preload(urls, callback){
    //if url is a string,
    if (typeof(urls) === "string"){
        urls = [urls];
    }

    let n = 0;
    let endl = 0;
    for (let i = 0; i < urls.length; i++) {
        PRELOADURL_LIST[i + PRELOADURL_LIST.length] = {url:urls[i], status:0};
        let ele = document.createElement('img');
        ele.meta_onload = callback;
        ele.addEventListener('load', function(event){
            let prog = PRELOAD_GET_PROGRESS(event.srcElement.src);
            //document.getElementById('create_img').src = event.srcElement.src;
            //call onload;
            if (typeof(event.srcElement.meta_onload) === 'function'){
                event.srcElement.meta_onload(event.srcElement.src, prog, "pass");
            }

            if (prog == 100){
                PRELOADURL_LIST = [];
            }
        });
        ele.addEventListener('error', function(event){
            let prog = PRELOAD_GET_PROGRESS(event.srcElement.src);
            //call onload;
            if (typeof(event.srcElement.meta_onload) === 'function'){
                event.srcElement.meta_onload(event.srcElement.src, prog, "error");
            }

            if (prog == 100){
                PRELOADURL_LIST = [];
            }
        });
        ele.src = urls[i];
    }

    return PRELOADURL_LIST.length;
}

function PRELOAD_GET_PROGRESS(url){
    if (PRELOADURL_LIST.length == 0){
        return 100;
    }
    if (typeof(url) !== "string" ){
        url = "";
        console.log("BBB");
    }

    let n = 0;
    for (let i = 0; i < PRELOADURL_LIST.length; i++) {
        if (url == PRELOADURL_LIST[i].url && PRELOADURL_LIST[i].status == 0){
            PRELOADURL_LIST[i].status = 1;
            url = "";
        }
        if (PRELOADURL_LIST[i].status == 1){
            //loaded
            n++;
        }
    }

    return n / PRELOADURL_LIST.length * 100;
}
