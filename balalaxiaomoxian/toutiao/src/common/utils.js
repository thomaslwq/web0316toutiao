/**
 * 消息控件
 * 
 */

function Message(options) {
    let msg = options.msg || ""
    let duration = options.duration || 3000

    let tipEl = document.createElement("div");
    //添加类名
    tipEl.classList.add("tt-message")
    tipEl.innerHTML = msg;
    document.body.append(tipEl)
    setTimeout(() => {
        document.body.removeChild(tipEl)
    }, duration);
}
export { Message }