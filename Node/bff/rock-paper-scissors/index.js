const game = require('./action');
const { stdin, exit } = process;

let count = 0;
stdin.on('data', e => {
    // 用户输入
    const playerAction = e.toString().trim();
    const result = game(playerAction);

    if(result === 1) {
        count++;
    }
    if(count === 3) {
        console.log('你太厉害了，我不玩了！！');
        exit();
    }
});