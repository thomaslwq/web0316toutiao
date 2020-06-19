(function () {
    function resize() {
        // ui 给的原型稿的 宽度
        let uiWidth = 750;
        let uiFontSize = 20;
        // 计算一下 html 根元素的 字体大小 
        // 获取 当前设备的宽度
        let clientWidth = document.documentElement.clientWidth;
        // html 的根字体大小 是   htmlFontSize
        // clientWidth/htmlFontSize = uiWidth/uiFontSize
        // 411/htmlFontSize = 750/20
        // htmlFontSize/411 = 20/750
        // htmlFontSize = 20 * 411/650
        htmlFontSize = uiFontSize * clientWidth / uiWidth;
        document.documentElement.style.fontSize = htmlFontSize + "px";
        console.log(htmlFontSize);
    }
    // 屏幕大小发生变化
    window.addEventListener("resize",resize);
    // 横屏事件
    window.addEventListener("orientationchange",resize);

    resize();


})()