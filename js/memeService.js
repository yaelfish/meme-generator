'use strict';
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
        createTxtObject('', 40, 'center', 'bottom', 200, 400, 'black', 'white', 'impact'),
        createTxtObject('', 40, 'center', 'middle', 200, 180, 'black', 'white', 'impact')
    ]
};

function createTxtObject(line = '', size = 30, align = 'center', baseline = 'middle', posX = 200, posY = 240, color = 'black', bgColor = 'white', fontFamily = 'impact') {
    let textObj = {
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
    return textObj;
}

function deleteCurrLine() {
    gMeme.txts[gCurrTxtLine].line = '';
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function loadImages() {
    return gImgs;
}

function saveInputDetails(val) {
    gMeme.txts[gCurrTxtLine].line = val;
}

function setNewCurrentLine() {
    if (gCurrTxtLine === gMeme.txts.length-1){
        gCurrTxtLine = 0;
    }
    else {
        gCurrTxtLine++;
    }
    gMeme.selectedTxtIdx = gCurrTxtLine;
}

function setTextAlign(val) {
    gMeme.txts[gCurrTxtLine].align = val;
}

function setBgColor(val) {
    gMeme.txts[gCurrTxtLine].bgColor = val;
}

function setColor(val) {
    gMeme.txts[gCurrTxtLine].color = val;
}

function setFontFamily(val) {
    gMeme.txts[gCurrTxtLine].fontFamily = val;
}







