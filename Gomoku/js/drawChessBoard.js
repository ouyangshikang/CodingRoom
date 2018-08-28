var chess = document.getElementById('chess');
var context =  chess.getContext('2d');
context.strokeStyle = '#bfbfbf';
var drawChessBoard = function(){  //画棋盘
  for (var i = 0; i < 15; i++) {
      context.moveTo(15 + i*30,15);
      context.lineTo(15 + i*30,435);
      context.stroke();
      context.moveTo(15,15+i*30);
      context.lineTo(435, 15+i*30);
      context.stroke();
  }
}




var logo = new Image(); //加载背景水印
logo.src = "./1.jpg";
logo.onload = function () {
  context.drawImage(logo,0,0,450,450);
  drawChessBoard();

}





var oneStep = function(i,j,me){
  context.beginPath();//画棋子
  context.arc(15 + i*30,15 + j*30,13,0,2 * Math.PI);
  context.closePath();
  var gradient = context.createRadialGradient(15 + i*30 +2, 15 + j*30 -2, 13, 15 + i*30 +2, 15 + j*30 -2, 0);
  if(me){
    gradient.addColorStop(0,"#0A0A0A");
    gradient.addColorStop(1,"#636766");
  }
  else {
    gradient.addColorStop(0,"#D1D1D1");
    gradient.addColorStop(1,"#F9F9F9");
  }
  context.fillStyle = gradient;
  context.fill();
}






var wins = [];//赢法数组
var mywin = [];//我方赢法数组
var comwin = [];//计算机赢法数组
var count = 0;//赢法种数

for(var i = 0; i < 15;i++){//赢法数组初始化
    wins[i] = [];
    for(var j = 0; j<15;j++){
        wins[i][j] = [];
    }
}

//横排赢法
for(var i=0;i<11;i++){
  for(var j = 0;j < 15;j++){
    for(var k=0;k<5;k++){
      wins[i+k][j][count]=true;
    }
    count++;
  }
}
//竖排赢法
for(var i = 0 ; i<15;i++){
  for(var j = 0;j<11;j++){
    for(var k = 0;k<5;k++){
      wins[i][j+k][count]=true;
    }
    count++;
  }
}
//斜赢法
for(var i=0;i<11;i++){
  for(var j=0;j<11;j++){
    for(var k=0;k<5;k++){
      wins[i+k][j+k][count] = true;
    }
    count++;
  }
}

//反斜赢法
for(var i=0;i<11;i++){
  for(var j=14;j>3;j--){
    for(var k=0;k<5;k++){
      wins[i+k][j-k][count]=true;
    }
    count++;
  }
}
console.log(count);

for(var i=0;i<count;i++){
    mywin[i]=0;
    comwin[i]=0;
}


var m = true;
var position = [];//存储棋子的位置信息，0表示没有棋子，1表示黑棋，2为白棋
for (var i = 0; i < 15; i++) {
  position[i] = [];
  for(var j =0;j<15;j++){
    position[i][j]=0;
  }
}

var over = false;

chess.onclick = function (e) {
  if(over){
    return;
  }
  if(!m){
    return;
  }
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x / 30);
  var j = Math.floor(y / 30);
  console.log(i+"+" +j);
  // console.log(m);
  if (position[i][j] == 0) {
    oneStep(i,j,m);
    // if(m){
    position[i][j] = 1;

    // }
    // else {
    //   // position[i][j] = 2;
    // }
    // m = !m;
  }
  for(var k=0;k<count;k++){
    if(wins[i][j][k]){
      mywin[k]++;
      comwin[k] =6;
      if(mywin[k] == 5){
        alert("you win");
        over=true;
      }
    }
  }
  if(!over){
    m =!m;
    computerAI();
  }

}


var computerAI = function(){
  var myScore=[];
  var comScore=[];
  var max=0;//最大分数
  var u=0;
  var v=0;

  for(var i=0;i<15;i++){
    myScore[i]=[];
    comScore[i]=[];
    for(var j=0;j<15;j++){
      myScore[i][j]=0;
      comScore[i][j]=0;
    }
  }

  for(var i=0;i<15;i++){//先判断有没有地方可落子
    for(var j=0;j<15;j++){
      if(position[i][j]==0){
          for(var k=0;k<count;k++){
            if(wins[i][j][k]){
              if(mywin[k]==1){
                myScore[i][j] += 100;
              }
              else if (mywin[k]==2) {
                myScore[i][j] +=200;
              }
              else if (mywin[k]==3) {
                myScore[i][j] +=500;
              }
              else if (mywin[k]==4) {
                myScore[i][j] +=1000;
              }

              if(comwin[k]==1){
                comScore[i][j] += 120;
              }
              else if (comwin[k]==2) {
                comScore[i][j] +=220;
              }
              else if (comwin[k]==3) {
                comScore[i][j] +=520;
              }
              else if (comwin[k]==4) {
                comScore[i][j] +=2000;
              }
            }
          }
          console.log(myScore);
          console.log(comScore);
          //判断拦截用户位置的分数最高
          if (myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
          } else if (myScore[i][j] == max){
                if (comScore[i][j] > comScore[u][v]){
                    u = i;
                    v = j;
                  }
          }
          //判断自己下哪里分数最高
          if (comScore [i][j] > max){
              max = comScore[i][j];
              u = i;
              v = j;
          } else if (comScore[i][j] == max){
                if (myScore[i][j] > myScore[u][v]){
                    u = i;
                    v = j;
                }
          }
          console.log(u);
          console.log(v);
          console.log(max)

      }


    }
  }

  oneStep(u,v,m);
  position[u][v] = 2;
  for(var k=0;k<count;k++){
    if(wins[u][v][k]){
      comwin[k]++;
      mywin[k] =6;
      if(comwin[k] == 5){
        alert("you lose");
        over=true;
      }
    }
  }
  if(!over){
    m = !m;
  }

}
