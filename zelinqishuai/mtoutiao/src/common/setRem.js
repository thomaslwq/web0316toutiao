function reSizeRem (){
    function resize(){
        let uiWidth = 750;
        let uiFontSize = 20;
        let clienWidth = document.documentElement.clientWidth;
        let htmlFontSize;
        htmlFontSize = uiFontSize/uiWidth*clienWidth
        document.documentElement.style.fontSize = htmlFontSize + 'px'
        console.log(htmlFontSize);
    }
    resize();
    window.addEventListener('resize',resize);
    window.addEventListener('readystatechange',resize)
    // var dpr = window.devicePixelRatio || 1
    // function setBodyFontSize () {
    //     if (document.body) {
    //       document.body.style.fontSize = (12 * dpr) + 'px'
    //     }
    //     else {
    //       document.addEventListener('DOMContentLoaded', setBodyFontSize)
    //     }
    //   }
    //   setBodyFontSize();
}

export { reSizeRem }