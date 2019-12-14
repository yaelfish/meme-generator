'use strict';
  
var gCanvas;
var gCtx;
var x = 75;
var y = 50;
var WIDTH = 400;
var HEIGHT = 300;
var dragok = false,
    text = "Hey there im a movin! Alot!!",
    textLength = (text.length * 14)/2;

function rect(x,y,w,h) {
  gCtx.beginPath();
  gCtx.rect(x,y,w,h);
  gCtx.closePath();
  gCtx.fill();
}

function drawText(x,y){
  gCtx.font = "14px Impact";
  gCtx.fillText(text, x, y);
  
  gCtx.beginPath();
  gCtx.rect(x,y-14,textLength,14);
  gCtx.closePath();
  gCtx.stroke();
}

function clear() {
 gCtx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
 gCanvas = document.getElementById("canvas");
 gCtx = gCanvas.getContext("2d");
 gCanvas.onmousedown = myDown;
 gCanvas.onmouseup = myUp;
 return setInterval(draw, 10);
}

function draw() {
 clear();
 gCtx.fillStyle = "#FAF7F8";
 rect(0,0,WIDTH,HEIGHT);
 gCtx.fillStyle = "#000";
 drawText(x, y);
}

function myMove(e){
 if (dragok){
  x = e.pageX - gCanvas.offsetLeft;
  y = e.pageY - gCanvas.offsetTop;
 }
}

function myDown(e){
 if (e.pageX < x + textLength + gCanvas.offsetLeft && e.pageX > x - textLength + gCanvas.offsetLeft && e.pageY < y + 15 + gCanvas.offsetTop &&
 e.pageY > y -15 + gCanvas.offsetTop){
  x = e.pageX - gCanvas.offsetLeft;
  y = e.pageY - gCanvas.offsetTop;
  dragok = true;
  gCanvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 gCanvas.onmousemove = null;
}
  

