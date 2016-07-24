  window.onload = draw;
  var can;
  var cancxt;
  var canWidth;
  var canHeight;
  var CheckNum = 20;
  var ex, ey;
  var i1, j1;
  var isWhite = true;
  var count = 0;
  var myWin = [];
  var computerWin = [];
  var over = false;
  var isHold = [];//初始化该棋格是否有棋！
  
  
  for (var i = 0; i < CheckNum; i++) {
	  isHold[i] = [];
	  for (var j = 0; j < CheckNum; j++) {
		  isHold[i][j] = 0;
	  }
  }
  var IsWin = [];//赢检测数组
  var myWin = [];
  var Score = 0;
  var ComputerWin = [];
  for (var i = 0; i < CheckNum; i++) {
	  IsWin[i] = [];
	  for (var j = 0; j < CheckNum; j++) {
		  IsWin[i][j] = [];
	  }
  }
  for (var i = 0; i < CheckNum; i++) {//竖着的组合
	  for (var j = 0; j < CheckNum-4; j++) {
		  for (var k = 0; k < 5; k++) {
			  IsWin[i][j + k][count] = true;
		  }
		  count++;
	  }
  }
  for (var i = 0; i < CheckNum - 4; i++) {//横着组合
	  for (var j = 0; j < CheckNum; j++) {
		  for (var k = 0; k < 5; k++) {
			  IsWin[i + k][j][count] = true;
		  }
		  count++;
	  }
  }
  for (var i = 0; i < CheckNum - 4; i++) {//\
	  for (var j = 0; j < CheckNum - 4; j++) {
		  for (var k = 0; k < 5; k++) {
			  IsWin[i + k][j + k][count] = true;
		  }
		  count++;
	  }
  }
  for (var i = 0; i < CheckNum - 4; i++) {// /
	  for (var j = CheckNum-1; j >3; j--) {
		  for (var k = 0; k < 5; k++) {
			  IsWin[i + k][j - k][count] = true;
		  }
		  count++;
	  }
  }
  
  for (var i = 0; i < count; i++) {
	  myWin[i] = 0;
	  computerWin[i] = 0;
  }
  //console.log(count);总共832种赢法
  function draw() {
	  can = document.getElementById("can");
	  cancxt = can.getContext("2d");
	  canWidth = can.width;
	  canHeight = can.height;
	  drawCheck();
	  drawText();
	  can.addEventListener("click", mouseClick, false);
  
  
  }
  function drawCheck() {
	  for (var i = 0; i < CheckNum; i++) {
		  cancxt.save();
		  cancxt.beginPath();
		  cancxt.strokeStyle = "#BFBFBF";
		  cancxt.lineWidth = "0.5";
		  cancxt.moveTo(15 + i * 30, 15);
		  cancxt.lineTo(15 + i * 30, 585);
		  cancxt.moveTo(15, 15 + i * 30);
		  cancxt.lineTo(585, 15 + i * 30);
		  cancxt.stroke();
		  cancxt.closePath();
		  cancxt.restore();
	  }
  }
  //落棋
  function oneStep(x, y, me) {
	  cancxt.save();
	  cancxt.beginPath();
  
	  var peekhole = cancxt.createRadialGradient(x + 2, y + 2, 10, x + 2, y + 2, 3);
	  // peekhole.addColorStop(0.0,"transparent");
	  if (!me) {//黑色
		  peekhole.addColorStop(0, "#0a0a0a");//#fff白色
		  peekhole.addColorStop(1.0, "#636766");
	  } else {
		  peekhole.addColorStop(0, "#D1D1D1");
		  peekhole.addColorStop(1.0, "#f9f9f9");
	  }
	  cancxt.fillStyle = peekhole;
	  cancxt.arc(x, y, 13, 0, 2 * Math.PI);
	  cancxt.fill();
	  cancxt.closePath();
	  cancxt.restore();
  }
  
  
  function mouseClick(e) {
	  if (e.offsetX || e.layerX)
		  ex = e.offsetX == undefined ? e.layerX : e.offsetX;
	  if (e.offsetY || e.layerY)
		  ey = e.offsetY == undefined ? e.layerY : e.offsetY;
	  getPoint(ex, ey);
  }
  
  function getPoint(ex, ey) {
	  var X1 = Math.floor((ex) / 30);
	  var X2 = Math.floor((ex - 30) / 30);
	  i1 = X1 > X2 ? X1 : X2;
	  var Y1 = Math.floor((ey) / 30);
	  var Y2 = Math.floor((ey - 30) / 30);
	  j1 = Y1 > Y2 ? Y1 : Y2;
	  var X = i1 * 30 + 15;
	  var Y = j1 * 30 + 15;
	  if (over)
		  return;
	  if(!isWhite)
	      return;
	    if (isHold[i1][j1] == 0) {
			  oneStep(X, Y, true);
			  isHold[i1][j1] = 1;
	          for (var k = 0; k < count; k++) {
		         if (IsWin[i1][j1][k]) {
			         myWin[k]++;
			         computerWin[k] = 6;
			         if (myWin[k] == 5) {
				      window.alert("白棋 win！")
				      over = true;
			         }
		          }
	           }
			   if (!over) {
		         isWhite = !isWhite;
		         ComputerAI();
	           }
	     }
  }
  
  var ComputerAI = function () {
	  var myScore = [];
	  var computerScore = [];
	  
      var u = 0, v = 0, max = 0;
	  for (var i = 0; i < CheckNum; i++) {
		  myScore[i] = [];
		  computerScore[i] = [];
		  for (var j = 0; j < CheckNum; j++) {
			  myScore[i][j] = 0;
			  computerScore[i][j] = 0;
		  }
	  }
	  for (var i = 0; i < CheckNum; i++) {
		  for (var j = 0; j < CheckNum; j++) {
			  if (isHold[i][j] == 0) {
				  for (var k = 0; k < count; k++) {
					  if (IsWin[i][j][k]) {
						  if (myWin[k] == 1)
							  myScore[i][j] += 200;
						 else if (myWin[k] == 2)
							  myScore[i][j] += 400;
						  else if (myWin[k] == 3)
							  myScore[i][j] += 2000;
						 else if (myWin[k] == 4)
							  myScore[i][j] += 10000;
						  if (computerWin[k] == 1)
							  computerScore[i][j] += 220;
						 else if (computerWin[k] == 2)
							  computerScore[i][j] += 420;
						 else if (computerWin[k] == 3)
							  computerScore[i][j] += 2200;
						 else  if (computerWin[k] == 4)
							  computerScore[i][j] += 20000;
					  }
				  }
				 
				  if (myScore[i][j] > max) {
					  max = myScore[i][j];
					  u = i;
					  v = j;
				  } else if (myScore[i][j] == max) {
					  if (computerScore[i][j] > computerScore[u][v]) {
						  u = i;
						  v = j;
					  }
				  }
				   if (computerScore[i][j] > max) {
					  max = computerScore[i][j];
					  u = i;
					  v = j;
				  } else if (computerScore[i][j] == max) {
					  if (myScore[i][j] > myScore[u][v]) {
						  u = i;
						  v = j;
					  }
				  }
			  }
		  }
	  }
	  oneStep(30 * u + 15, 30 * v + 15, false);
	  isHold[u][v] = 2;
	  for (var k = 0; k < count; k++) {
		  if (IsWin[u][v][k]) {
			  computerWin[k]++;
			  myWin[k] = 6;
			  if (computerWin[k] == 5) {
				  window.alert("电脑 win！")
				  over = true;
			  }
		  }
	  }
	  if (!over) {
		  isWhite = !isWhite;
	  }
  }