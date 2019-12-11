'use strict';

let gImgs = [];
let gImgId = 0;

function createImages() {
    gImages.unshift(createImage('5.jpg', ['happy','in awe']));
    gImages.unshift(createImage('8.jpg', ['cute', 'puppy']));
    gImages.unshift(createImage('9.jpg', ['overwhelming', 'funny']));
}

function createImage(url, keywords) {
    return {
        id: gImgId++,
        url: url,
        keywords: keywords
    }
}
