//1. Model
let video, videoMic;
let canvas, context, W, H;

let px = 10, py = 10, pw = 160, ph = 90, h = 30;
let w;
let desenareControale = false;
let mx = 0, my = 0;

//2. Desenare
function desenare() {

    context.drawImage(video, 0, 0);

    if (desenareControale) {

        context.drawImage(videoMic, 
            0, 0, W, H,
            px, py, pw, ph);

        context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillRect(0, H-h, W, h);

        context.fillStyle = 'rgba(255, 0, 0, 0.3)';
        w = video.currentTime * W / video.duration;
        context.fillRect(0, H-h, w, h);

        context.fillStyle = 'white';
        context.font = '14pt Arial';
        context.textAlign = 'left'
        context.textBaseline = 'middle';
        context.fillText(video.src, 5, H-h / 2);

        context.textAlign = 'right';
        context.fillText(Math.round(video.currentTime), W - 10, H - h / 2);
    }

    requestAnimationFrame(desenare);
}

function canvasClick() {
    if (mx >= px && mx <= px + pw
        && my >= py && my <= py + ph) {

        console.log("interschimb");
        let aux = video;
        video = videoMic;
        videoMic = aux;
    
    } else if(my >= H - h) {
        console.log("progress bar");
        video.currentTime = mx * video.duration / W;
    } else {
        console.log("play/pause");
        video.paused ? video.play() : video.pause();
        videoMic.paused ? videoMic.play() : videoMic.pause();
    }

};


function aplicatie() {
    video = document.createElement('video');
    video.src = 'media/cat1.mp4'
    video.loop = true;
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    W = canvas.width; 
    H = canvas.height;


    videoMic = document.createElement('video');
    videoMic.loop = true;
    videoMic.src = 'media/cat2.mp4';
    videoMic.load();


    canvas.addEventListener('mouseenter', e => {
        desenareControale = true;
    });

    canvas.addEventListener('mouseleave', e => {
        desenareControale = false;
    });


    canvas.addEventListener('mousemove', e => {
        mx = e.x - canvas.getBoundingClientRect().x;
        my = e.y - canvas.getBoundingClientRect().y;
    });

    canvas.addEventListener('click', canvasClick);

    desenare();
    

    
}

document.addEventListener('DOMContentLoaded', aplicatie);