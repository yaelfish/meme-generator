'use strict';
// get canvas related references
// let gCanvas = document.getElementById("canvas");
// let gCtx = gCanvas.getContext("2d");
let canvasToClient = gCanvas.getBoundingClientRect();
let offsetX = canvasToClient.left;
let offsetY = canvasToClient.top;
// let WIDTH = gCanvas.width;
// let HEIGHT = gCanvas.height;

// drag related variables
let dragok = false;
let startX;
let startY;

// an array of objects that define different rectangles
// var rects = [];
// rects.push({
//     x: 75 - 15,
//     y: 50 - 15,
//     width: 30,
//     height: 30,
//     fill: "#444444",
//     isDragging: false
// });
// rects.push({
//     x: 75 - 25,
//     y: 50 - 25,
//     width: 30,
//     height: 30,
//     fill: "#ff550d",
//     isDragging: false
// });
// rects.push({
//     x: 75 - 35,
//     y: 50 - 35,
//     width: 30,
//     height: 30,
//     fill: "#800080",
//     isDragging: false
// });
// rects.push({
//     x: 75 - 45,
//     y: 50 - 45,
//     width: 30,
//     height: 30,
//     fill: "#0c64e8",
//     isDragging: false
// });

// listen for mouse events
// canvas.onmousedown = myDown;
// canvas.onmouseup = myUp;
// canvas.onmousemove = myMove;

// call to draw the scene
draw();

// draw a single rect
function rect(x, y, w, h) {
    gCtx.beginPath();
    gCtx.rect(x, y, w, h);
    gCtx.closePath();
    gCtx.fill();
}

// clear the canvas
function clear() {
    gCtx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
    clear();
    gCtx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);
    // redraw each rect in the rects[] array
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        gCtx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height);
    }
}


// handle mousedown events
function myDown(e) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);
    
    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (currMousePosX > r.x && currMousePosX < r.x + r.width && currMousePosY > r.y && currMousePosY < r.y + r.height) {
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
        }
    }
    // save the current mouse position
    startX = currMousePosX;
    startY = currMousePosY;
}


// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        rects[i].isDragging = false;
    }
}


// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {

        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;

        // move each rect that isDragging 
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        draw();

        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;

    }
}