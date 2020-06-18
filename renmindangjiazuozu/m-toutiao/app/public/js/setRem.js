function setRem() {
    function resize() {
        // ui提供的页面宽度
        let uiWidth = 750;
        // ui提供的字体大小
        let uiFontSize = 20;
        // 用户端窗口最大宽度
        let clientWidth = document.documentElement.clientWidth;
        let htmlFontSize = uiFontSize * clientWidth / uiWidth;
        document.documentElement.style["font-size"] = `${htmlFontSize}px`;
    }

    window.addEventListener("resize" ,resize);
    // 手机端横屏事件
    window.addEventListener("orientationchange",resize);
    resize();
}

export default setRem