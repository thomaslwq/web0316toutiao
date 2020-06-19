//弹窗提示
function Message(options={msg:''}){
    let msg = options.msg || '';
    let duration = options.duration || 3000;
    let tips = document.createElement('div');
    // console.log("创建了");
    tips.innerHTML = msg;
    tips.classList.add('tt-message');
    // console.log(tips);
    // console.log(msg);
    document.body.appendChild(tips);
    setTimeout(() => {
        // console.log('删除了');
        document.body.removeChild(tips)
    }, duration);
}

export { Message }