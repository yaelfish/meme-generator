'use strict';

let gCanvas;
let gCtx, gImg;
let gCurrImg;

function init(){

}

function onChosenImg(elImg) {  
    document.body.classList.add('canvas-open');
    gCurrImg = elImg;
    initCanvas();
}

function initCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = 'black';
    drawImg();
}

function drawImg() {
    if (gCurrImg)
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gCurrImg = new Image()
        gCurrImg.onload = () => {
            gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gCurrImg.src = './images/patrick.jpg'
    }
}
