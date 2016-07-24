// JavaScript Document
function drawText(){
	cancxt.save();
    cancxt.fillStyle = "rgba(255,200,200,0.3)";
    cancxt.shadowBlur = 15;//阴影
    cancxt.shadowColor = "#000";
    cancxt.font = "90px 微软雅黑";
    cancxt.fillText("森警五子棋盘 ", 30, 250);
	cancxt.restore();
	}