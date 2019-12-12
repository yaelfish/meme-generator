'use strict';

let gCurrCanvas = {};
let gCurrMeme = {};
let gMemes = [];
let gImgId = 0;
let gId = 0;

let gImgs = [
    {id: 1, url: '1.jpg', keywords: ['happy']},
    {id: 2, url: '2.jpg', keywords: ['wow'] },
    { id: 3, url: '3.jpg', keywords: ['sad'] },
    { id: 4, url: '4.jpg', keywords: ['exciting'] },
    { id: 5, url: '5.jpg', keywords: ['cute'] },
    { id: 6, url: '6.jpg', keywords: ['cute'] },
    { id: 7, url: '7.jpg', keywords: ['happy'] },
    { id: 8, url: '8.jpg', keywords: ['exciting'] },
    { id: 9, url: '9.jpg', keywords: ['exciting'] },
    { id: 10, url: '10.jpg', keywords: ['happy'] },
    { id: 11, url: '11.jpg', keywords: ['happy'] },
    { id: 12, url: '12.jpg', keywords: ['happy'] },
    { id: 13, url: '13.jpg', keywords: ['happy'] },
    { id: 14, url: '14.jpg', keywords: ['happy'] },
    { id: 15, url: '15.jpg', keywords: ['happy'] },
    { id: 16, url: '16.jpg', keywords: ['happy'] },
    { id: 17, url: '17.jpg', keywords: ['happy'] },
];

let gMeme = {
    selectedImgId: 4,
    selectedTxtIdx: 0,
    txts: [
        createTxtObject('', 40, 'center', 'top', 200, 20, 'black', 'white', 'impact'), 
        createTxtObject('', 40, 'center', 'bottom', 200, 460, 'black', 'white', 'impact'),
        createTxtObject('', 40, 'center', 'middle', 200, 200, 'black', 'white', 'impact')
    ]
};

function createTxtObject(line = '', size = 30, align = 'center', baseline = 'middle', posX = 200, posY = 240, color = 'black', bgColor = 'white', fontFamily = 'impact') {
    return {
        id: gId++,
        line,
        size,
        align,
        baseline,
        posX,
        posY,
        color,
        bgColor,
        fontFamily
    }
}

function addLine(line = '', size = 30, align = 'center', baseline = 'middle', posX = 200, posY = 240, color = 'black', bgColor = 'white', fontFamily = 'impact') {
    gMeme.txts.push(createTxtObject(line, size, align, baseline, posX, posY, color, bgColor, fontFamily))
}

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

function saveInputDetails(val) {
    gCurrCanvas.text = val;
    gMeme.txts[gCurrTxtLine].line = val;
}

function setNewCurrentLine() {
    if (gCurrTxtLine === gMeme.txts.length){
        gCurrTxtLine = 0;
    }
    else {
        gCurrTxtLine++;
    }
    gMeme.selectedTxtIdx = gCurrTxtLine;
}

function setCanvasPrefs() {
    return gCurrCanvas = {
        color: '#000000',
        bgColor: '#ffffff',
        shape: 'text',
        lineWidth: '15',
        text: 'Hello World',
        font: 'meme-impact',
        fontSize: 40
    }
}

function setShape(shape) {
    gCurrCanvas.shape = shape;
}

function setTextAlign(val) {
    gMeme.txts[gCurrTxtLine].align = val;
}

function setBgColor(val) {
    gMeme.txts[gCurrTxtLine].bgColor = val;
}

function setFontFamily(val) {
    gMeme.txts[gCurrTxtLine].fontFamily = val;
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

function createImages() {
    gImages.unshift(createImage('5.jpg', ['happy', 'in awe']));
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

function createMeme(selectedImgId, selectedTxtIdx, txts) {
    let gMeme = {
        selectedImgId,
        selectedTxtIdx,
        txts
    }
    return gMeme;
}

// function findImgById(imgId) {
//     let imgToReturn = {};
//     gImgs.forEach((img) => {
//         if(img.id === imgId) {
//             imgToReturn = img;
//         }
//     });
//     return imgToReturn;
// }

// function setCurrentMeme(imgId) {
//     gMemes.forEach((meme)=> {
//         if (meme.selectedImgId === imgId){
//             gCurrMeme = meme;
//         }
//     });
//     return gCurrMeme;
// }

// function getCurrCanvas() {
//     return gCurrCanvas;
// }