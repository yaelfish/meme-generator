'use strict';

let gCanvas, gCtx;
let gElImg;
let gLastX = 0;
let gLastY = 0;
let gCurrTxtLine = 0;

function init(){
    loadImages();
    renderImages();
}

function onAboutOpen(el) {
    document.body.classList.remove('canvas-open');
    document.querySelector('.link-memes').classList.remove('active');
    document.querySelector('.link-gallery').classList.remove('active');
    el.classList.add('active');
}

function onGalleryOpen(el) {
    document.body.classList.remove('canvas-open');
    document.querySelector('.link-memes').classList.remove('active');
    document.querySelector('.link-about').classList.remove('active');
    el.classList.add('active');
}

function onMemesOpen(el) {
    document.body.classList.remove('canvas-open');
    document.querySelector('.link-about').classList.remove('active');
    document.querySelector('.link-gallery ').classList.remove('active');
    el.classList.add('active');
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container');
    let strHtml = ``;
    let imgs = gImgs.map((img)=> {
        strHtml+= `
        <div class="img-container">
            <img src="./images/gallery/${img.url}" data-img="${img.id}" onclick="onChosenImg(this)">
        </div>\n`
    });
    elGallery.innerHTML = strHtml;
}

function onChosenImg(elImg) {  
    document.body.classList.add('canvas-open');
    document.querySelector('a.flex.align-center.justify-center.active').classList.remove('active');
    gElImg = elImg;
    renderCanvas();
}

function onChangeFontSize(diff) {
    gMeme.txts[gCurrTxtLine]["size"] += diff;
    renderCanvas();
}

function onChangeTextAlign(direction) {
    setTextAlign(direction);
    renderCanvas();
}

function onMoveLinesUpDown(diff) { 
    gMeme.txts[gCurrTxtLine].posY += diff;
    renderCanvas();
}

function renderCanvas() { 
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black'; 
    drawImg();
    markSelectedLine();
    if(gMeme.txts.length > 0){
        drawTexts();
    }
}

function drawTexts() {
    gMeme.txts.forEach((text)=> {
        drawText(text.line, text.size, text.align, text.baseline, text.posX, text.posY, text.color, text.bgColor, text.fontFamily)
    });
}

function onInputUpdate(val){
    saveInputDetails(val);
    renderCanvas();
}

function onaddNewLine() {
    addNewLine();
    onSwitchLines();
    renderCanvas();
}

function onSwitchLines(){ 
    setNewCurrentLine();
    document.querySelector('#text').value = gMeme.txts[gCurrTxtLine].line;
    document.querySelector('#text').focus(); 
    renderCanvas();
}

function markSelectedLine() {
    let x = gMeme.txts[gCurrTxtLine].posX;
    let y = gMeme.txts[gCurrTxtLine].posY;
    drawRect(x, y);
    console.log(x, y);
    
}

function drawImg() {
    if (gElImg) {
        gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height)
    }
    else {
        gElImg = new Image()
        gElImg.onload = () => {
            gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gElImg.src = './images/gallery/patrick.jpg'
    }
}

function drawText(text, size, align, baseline, posX, posY, color, bgColor, fontFamily = 'impact') { 
    gCtx.save()
    gCtx.font = `${size}px ${fontFamily}`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = bgColor;
    gCtx.textAlign = align;
    gCtx.textBaseline = baseline;
    gCtx.fillText(text, posX, posY);
    gCtx.strokeText(text, posX, posY);
    gCtx.restore()

    console.log(posX, posY);
    
}

function drawRect(x, y) {
    gCtx.save()
    gCtx.strokeStyle = "white";
    gCtx.fillStyle = "rgba(255,255,255,0.3)";
    gCtx.beginPath();
    gCtx.rect(0, y - gMeme.txts[gCurrTxtLine]["size"], gCanvas.width, gMeme.txts[gCurrTxtLine]["size"]+10)
    gCtx.fillRect(0, y - gMeme.txts[gCurrTxtLine]["size"], gCanvas.width, gMeme.txts[gCurrTxtLine]["size"]+10)
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
}

function onChangeColor(val) {
    setColor(val);
    renderCanvas();
}

function onChangeBgColor(val) {
    setBgColor(val);
    renderCanvas();
}

function onChangeFontFamily() {
    let selectedFont = document.querySelector('select[name="font-family"]').value;
    setFontFamily(selectedFont);
    renderCanvas();
}

function onDeleteLine() {
    clearCanvas();
    deleteCurrLine();
    renderCanvas();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

