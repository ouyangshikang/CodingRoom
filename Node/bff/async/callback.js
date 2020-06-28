function interview(callback) {
    setTimeout(() => {
        if(Math.random() < 0.2) {
            callback(null, 'success');
        }
        else {
            callback(new Error('fail'));
        }
    }, 1000);
}


interview((status) => {
    if(status) {
        console.log('fail');
    }
    else {
        console.log('success');
    }
});
