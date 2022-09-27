function ajax(url, callback) {
    // 1. 创建 XMLHttpRequest 实例
    const xhr = new XMLHttpRequest();

    // 2. 发送请求
    xhr.open('GET', url, true); // true表示异步
    xhr.send();

    // 3. 服务端响应(监控 XMLHttpRequest 对象的状态变化，指定回调函数)
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
}

ajax('./a.json', (res) => {
    console.log(res);
});
