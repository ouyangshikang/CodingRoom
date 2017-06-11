var chess = document.getElementById('chess');
var wins = [];//赢法数组
var mywin = [];//我方赢法数组
var comwin = [];//计算机赢法数组
var count = 0;//赢法种数

for (var i = 0; i < 15; i++) {   //赢法数组初始化
  wins[i] = [];
  for(var j = 0; j<15; j++){
    wins[i][j]=[];
  }
}

//竖排赢法
for(var i = 0 ; i<15;j++){
  for(var j = 0;j<11;i++){
    for(var k = 0;k<5;k++){
      wins[i][j+k][count] = true;
    }
    count++;
  }
}

//横排赢法
for(var i=0;i<15;i++){
  for(var j = 0;j < 11 ;j++){
    for(var k =0;k<5;k++){
      wins[j+k][i][count]=true;
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
  }
}
//反斜赢法
for(var i=0;i<11;i++){
  for(var j=14;j>3;j--){
    for(var k=0;k<5;k++){
      wins[i+k][j-k][count]=true;
    }
    conut++;
  }
}

console.log(count);




for(var i = 0; i < count;i++){
    myWin[i] = 0;
    comWin[i] = 0;
}
