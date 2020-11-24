// 1. Model
let audio;
let canvas, context, W, H;
let mx = 0, my = 0;
let buttonSize = 30;
let lista = ['media/audio1.mp3',
    'media/audio2.mp3',
    'media/audio3.mp3',
];

let index = 0;

// 2. Desenare
function desenare() {
    // Stergere scena.
    context.fillStyle = 'black';
    context.fillRect(0, 0, W, H);

    // desenare progress bar
    context.fillStyle = 'gray';
    context.fillRect(0, H/2, W, H/2);

    context.fillStyle = 'blue';
    let pbWidth = audio.currentTime * W / audio.duration ;
    context.fillRect(0, H/2, pbWidth, H/2);
    
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = 'bold 12pt Tahoma';
    let pbText = `${Math.round(audio.currentTime)} / ${Math.round(audio.duration)}`;
    context.fillText(pbText, 3, 3 * H / 4);


    // desenare butoane
    context.fillStyle = 'gray';
    context.strokeStyle = 'gray';
    context.lineWidth = 4;

    context.beginPath();
    context.moveTo(buttonSize, 0);
    context.lineTo(0, buttonSize / 2);
    context.lineTo(buttonSize, buttonSize);
    context.stroke();

    context.beginPath();
    context.moveTo(buttonSize * 2, 0);
    context.lineTo(buttonSize * 3, buttonSize / 2);
    context.lineTo(buttonSize * 2, buttonSize);
    context.stroke();

    if (audio.paused) {
        // desenare play
        context.beginPath();
        context.moveTo(buttonSize * 1, 0);
        context.lineTo(buttonSize * 2, buttonSize / 2);
        context.lineTo(buttonSize * 1, buttonSize);
        context.fill();
    } else {
        // desenare pauza
        context.beginPath();
        context.moveTo(buttonSize * 1.33, 0);
        context.lineTo(buttonSize * 1.33, buttonSize);
        context.moveTo(buttonSize * 1.67, 0);
        context.lineTo(buttonSize * 1.67, buttonSize);
        context.stroke();
    }

    // playlist
    context.fillStyle = 'white';
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.font = 'bold 12pt Tahoma';
    context.fillText(lista[index], W - 3, H / 4);


    let list = document.querySelector('ul');
    list.innerHTML = '';
    for (let i=0; i<lista.length; i++) {
        let element = document.createElement('li');
        element.textContent = lista[i];
        list.append(element);

        element.dataset.index = index.toString();
        element.addEventListener('mousedown', e => {
            index = parseInt(e.target.dataset.index);
            avanseaza(0);
        });
        
        if (i === index) {
            element.style.fontWeight = 'bold';
        }

        
    }

    requestAnimationFrame(desenare);


}

// 3. Actualizare model - nu este cazul
// 4. Tratare evenimente
function mouseMove(e) {
    mx = e.x - canvas.getBoundingClientRect().x;
    my = e.y - canvas.getBoundingClientRect().y;
}

function canvasClick(e) {
    if (my < H / 2) {
        // butoane
        let buttonIndex = Math.floor(mx / buttonSize);
        switch(buttonIndex) {
            case 0: // prev
                avanseaza(-1);
                break;
            case 1: // play/pause
                audio.paused ? audio.play() : audio.pause();
                break;
            case 2: // next
                avanseaza(1);
                break;
            }
    } else {
        // PB 
        audio.currentTime = mx * audio.duration / W;
    }
}

function audioEnded() {
    avanseaza(1);
}

function avanseaza(delta) {
    index = index + delta;
    if (index >= lista.length) {
        index = 0;
    }

    if (index < 0) {
        index = lista.length - 1;

    }


    audio.src = lista[index];
    audio.load();
    audio.play();
}


function app() {

    // Initializare model.
    audio = document.querySelector('audio');
    canvas =  document.querySelector('canvas');
    context = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;

    // tratare evenimente
    document.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('click', canvasClick);
    audio.addEventListener('ended', audioEnded);

    // pornire aplicatie
    desenare();
}

document.addEventListener('DOMContentLoaded', app);