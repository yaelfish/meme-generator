'use strict';
let WIDTH = 500;
let HEIGHT = 500;
let gCanvas, gCtx;
let gOffsetX;
let gOffsetY;
let gElImg;
let gCurrTxtLine = 0;
let gLastX;
let gLastY;
let isDragMode = false;

/** Gallery Controller **/

function init() {
    loadImages();
    renderImages();
}

function onAboutOpen(el) {
    document.body.classList.remove('canvas-open');
    document.querySelector('.link-gallery').classList.remove('active');
    el.classList.add('active');
}

function onGalleryOpen(el) {
    document.body.classList.remove('canvas-open');
    document.querySelector('.link-about').classList.remove('active');
    el.classList.add('active');
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container');
    let strHtml = ``;
    let imgs = gImgs.map((img) => {
        strHtml += `
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
    initCanvas();
}

/** Canvas Controller **/

function initCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    let gCanvasToClient = gCanvas.getBoundingClientRect();
    gOffsetX = gCanvasToClient.left;
    gOffsetY = gCanvasToClient.top;
    WIDTH = gCanvas.width;
    HEIGHT = gCanvas.height;
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black';
    setTouchListeners();
    renderCanvas();
}

function setTouchListeners() {
    gCanvas.addEventListener('touchstart', onCanvasMouseDown);
    gCanvas.addEventListener('touchmove', onCanvasMouseMove);
    gCanvas.addEventListener('touchend', onCanvasMouseUp);
}


function onCanvasMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let currMousePosX = parseInt(e.clientX - gOffsetX);
    let currMousePosY = parseInt(e.clientY - gOffsetY);

    console.log('currMousePosX:', currMousePosX, 'currMousePosY:', currMousePosY );
    renderCanvas();
    // test each line to see if mouse is inside
    isDragMode = false;
    gMeme.txts.forEach((text) => {
        let textLength = (text.line.length * text.size) / 2;   
         if   ((e.pageX < (text.posX + textLength + gOffsetX)) &&
        (e.pageX > (text.posX - textLength + gOffsetX)) &&
        (e.pageY < (text.posY + text.size + gOffsetY)) &&
        (e.pageY > (text.posY - text.size + gOffsetY)))
            {
                isDragMode = true;
                text.isDragging = true;
                text.posX = e.pageX - gOffsetX;
                text.posY = e.pageY - gOffsetY;           
        }
    });

    // save the current mouse position
    gLastX = currMousePosX;
    gLastY = currMousePosY;
}

function onCanvasMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    isDragMode = false;
    gMeme.txts.forEach((text) => {
        text.isDragging = false;
    });
}

function onCanvasMouseMove(e) {
    if (isDragMode) {
        e.preventDefault();
        e.stopPropagation();

        let currMousePosX = parseInt(e.clientX - gOffsetX);
        let currMousePosY = parseInt(e.clientY - gOffsetY);
        let distanceX = currMousePosX - gLastX;
        let distanceY = currMousePosY - gLastY;

        gMeme.txts.forEach((text) => {
            if (text.isDragging) {
                text.posX += distanceX;
                text.posY += distanceY;
            }
        });

        renderCanvas();
        // reset the starting mouse position for the next mousemove
        gLastX = currMousePosX;
        gLastY = currMousePosY;
    }
}

function renderCanvas() {
    clearCanvas();
    drawImg();
    markSelectedLine();
    if (gMeme.txts.length > 0) {
        drawTexts();
    }
}

function drawTexts() {
    gMeme.txts.forEach((text) => {
        drawText(text.line, text.size, text.align, text.baseline, text.posX, text.posY, text.color, text.bgColor, text.fontFamily, text.isDragging)
    });
}

function onInputUpdate(val) {
    saveInputDetails(val);
    renderCanvas();
}

function onaddNewLine() {
    addNewLine();
    onSwitchLines();
    renderCanvas();
}

function onSwitchLines() {
    setNewCurrentLine();
    document.querySelector('#text').value = gMeme.txts[gCurrTxtLine].line;
    document.querySelector('#text').focus();
    renderCanvas();
}

function markSelectedLine() {
    let x = gMeme.txts[gCurrTxtLine].posX;
    let y = gMeme.txts[gCurrTxtLine].posY;
    drawRect(x, y);
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

function drawText(text, size, align, baseline, posX, posY, color, bgColor, fontFamily = 'impact', isDragging) {
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
}

function drawRect(x, y) {
    gCtx.save()
    gCtx.strokeStyle = "white";
    gCtx.fillStyle = "rgba(255,255,255,0.3)";
    gCtx.beginPath();
    gCtx.rect(0, y - gMeme.txts[gCurrTxtLine]["size"], gCanvas.width, gMeme.txts[gCurrTxtLine]["size"] + 10)
    gCtx.fillRect(0, y - gMeme.txts[gCurrTxtLine]["size"], gCanvas.width, gMeme.txts[gCurrTxtLine]["size"] + 10)
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
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

function onDownloadImg(img){
    clearCanvas();
    drawImg();
    drawTexts();
    downloadImg(img);
}

function onFacebookShare(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.btn-share').innerHTML = `
        <a class="btn share" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
        document.querySelector('.btn-share').classList.add('share');

    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}