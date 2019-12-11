'use strict';

let gCurrCanvas = {};
let gMemes = [];
let gImgId = 0;

let gImgs = [
    {id: 1, url: '003.jpg', keywords: ['happy']},
    {id: 2, url: '004.jpg', keywords: ['wow'] }
];

let gMeme = {
    selectedImgId: 4,
    selectedTxtIdx: 0,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};



function loadImages() {
    return gImgs;
}

function findTextToRender(imgId) {
    let textToRender;
    gMemes.forEach((meme)=> {
        if(meme.selectedImgId === imgId) textToRender = meme.txts[0]
    });
    return textToRender;
}

function findImgById(imgId) {
    let imgToReturn = {};
    gImgs.forEach((img) => {
        if(img.id === imgId) {
            imgToReturn = img;
        }
    });
    return imgToReturn;
}

function findImgByIdx(params) {

}

function setCanvasPrefs() {
    return gCurrCanvas = {
        color: '#000000',
        bgColor: '#ffffff',
        shape: 'text',
        lineWidth: '15',
        text: 'Hello World',
        font: 'meme-impact',
        fontSize: 16
    }
}

function createImages() {
    gImages.unshift(createImage('5.jpg', ['happy','in awe']));
    gImages.unshift(createImage('8.jpg', ['cute', 'puppy']));
    gImages.unshift(createImage('9.jpg', ['overwhelming', 'funny']));
}

function createImage(url, keywords) {
    let img = {
        id: gImgId++,
        url: url,
        keywords: keywords
    }
    return img;
}

function createMeme(selectedImgId, selectedTxtIdx, txts){
    let gMeme = {
        selectedImgId, 
        selectedTxtIdx, 
        txts
    }
    return gMeme;
}

function createMemes() {
    gMemes.unshift(createMeme(1, 0, 'I never eat Falafel'));
}


function loadMemes() {
    createMemes();
}

function createTxt(line, size, align, color) {
    let gTxt = {
        line,
        size,
        align,
        color
    }
    return gTxt;
}

function createTxts() {
    gTexts.unshift('I never eat Falafel', 20, 'left', '#FFBBFF')
}

function setShape(shape) {
    gCurrCanvas.shape = shape;
}

function setColor(color) {
    gCurrCanvas.color = color;
}

function setBgColor(bgColor) {
    gCurrCanvas.bgColor = bgColor;
}

function setLineWidth(lineWidth) {
    gCurrCanvas.lineWidth = lineWidth;
}

function setText(text) {
    gCurrCanvas.text = text;
}

function setFontSize(fontSize) {
    gCurrCanvas.fontSize = fontSize;
}

function getCurrCanvas() {
    return gCurrCanvas;
}