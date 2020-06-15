// 简易 消息控件的实现
// @options.msg 提示的信息 默认胃空
// @options.duartion 提示的时间 默认为 3s
function Message(options = { msg: "" }) {
    // console.log("消息控件");
    let msg = options.msg;
    let duration = 3000;
    // 创建一个提示元素
    let tipEl = document.createElement("div");
    tipEl.innerHTML = msg;
    tipEl.classList.add("tt.message");
    // 将创建的提示元素  追加到页面中
    document.body.appendChild(tipEl);
    // 默认三秒之后移除该元素
    setTimeout(function() {
        document.body.removeChild(tipEl);
    }, duration);
    console.log(msg);

}
export { Message }