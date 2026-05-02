"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    console.log(`Click coordinates: (${x}, ${y})`);
});
