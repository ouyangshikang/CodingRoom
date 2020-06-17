
module.exports = function(playerAction) {
    // 计算机随机
    const random = Math.random() * 3;
    let computerAction;

    if(random < 1) {
        computerAction = 'rock';
        console.log('电脑出了rock');
    }
    else if(random > 2) {
        computerAction = 'scissor';
        console.log('电脑出了scissor');
    }
    else {
        computerAction = 'paper';
        console.log('电脑出了paper');
    }

    if(computerAction === playerAction) {
        console.log('平局');
        return 0;
    }
    else if(
        (computerAction === 'rock' && playerAction === 'paper') ||
        (computerAction === 'scissor' && playerAction === 'rock') ||
        (computerAction === 'paper' && playerAction === 'scissor')
    ) {
        console.log('你赢了电脑');
        return 1;
    }
    else {
        console.log('你输了');
        return -1;
    }
}





