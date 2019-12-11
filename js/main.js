'use strict';

let gCanvas;
let gCtx, gImg;
let gCurrImg;
let gElIng;
let gLastX = 0;
let gLastY = 0;


function init(){
    loadImages();
    renderImages();
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container');
    let strHtml = ``;
    let imgs = gImgs.map((img)=> {
        strHtml+= `
        <div class="img-container">
            <img src="./images/gallery/${img.url}" data-img="${img.id}" onclick="onChosenImg(this,${img.id})">
        </div>\n
        `
    });
    elGallery.innerHTML = strHtml;
}

function onChosenImg(elImg,imgId) {  
    document.body.classList.add('canvas-open');
    gCurrImg = findImgById(imgId);
    gElIng = elImg;
    renderCanvas();
}

function onChangeFontSize(diff) {
    renderCanvas();
    gMeme.txts[0]["size"] += diff;
    gCurrCanvas.fontSize = gMeme.txts[0]["size"];
    let elInput = document.querySelector('#text');
    let inputValue = elInput.value;
    drawText(inputValue, gCanvas.width / 2, 20);
}

function onMoveLinesUpDown(diff) {
    renderCanvas();
    drawText(gCurrCanvas.text, gLastX, gLastY += diff); 
}

function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = 'black';
    drawImg();
    setCurrentMeme(gCurrImg.id);
    drawText(gMeme.txts[0]["line"], gCanvas.width / 2, gCanvas.height - 20);
}

function onInputUpdate(val){
    renderCanvas();
    gCurrCanvas.text = val;
    gLastX = gCanvas.width / 2;
    gLastY = 20;
    drawText(gCurrCanvas.text, gLastX, gLastY);
}

function drawImg() {
    if (gElIng) {
        gCtx.drawImage(gElIng, 0, 0, gCanvas.width, gCanvas.height)
    }
    else {
        gElIng = new Image()
        gElIng.onload = () => {
            gCtx.drawImage(gElIng, 0, 0, gCanvas.width, gCanvas.height)
        };
        gElIng.src = './images/gallery/patrick.jpg'
    }
}

function drawText(text, x, y) {
    gCtx.save()
    gCtx.font = `${gCurrCanvas.fontSize}px meme-impact`;
    gCtx.strokeStyle = gCurrCanvas.color;
    gCtx.fillStyle = gCurrCanvas.bgColor;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.lineWidth = gCurrCanvas.lineWidth;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    gCtx.restore()
}

function draw(ev) {
    gCtx.save()
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY

    switch (gCurrCanvas.shape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rectangle':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText(gCurrCanvas.text, offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
    }
    gCtx.restore()
}