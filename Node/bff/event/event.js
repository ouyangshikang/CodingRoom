const { EventEmitter } = require('events');

class GeekTime extends EventEmitter {
    constructor() {
        super();

        setInterval(() => {
            this.emit('newlesson', {
                price: Math.random() * 100
            });
        }, 2000);
    }
}

const geekTime = new GeekTime();

module.exports = geekTime;