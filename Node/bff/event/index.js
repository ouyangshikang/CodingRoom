const geek = require('./event');

geek.addListener('newlesson', (data) => {
    if(data.price < 60) {
        console.log('buy', data);
    }
    else {
        console.log('expensive', data);
    }
});