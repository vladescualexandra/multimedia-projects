function app() {
    let audio = document.querySelector('audio');
    audio.volume = 0.1;

    document.querySelector('#play').addEventListener('click', e => {
        if (audio.paused) {
            console.log("Este oprit => il pornim");
            audio.play();
        } else {
            console.log("Este pornit => il oprim");
            audio.pause();
        }
    });

    document.querySelector('#avansare').addEventListener('click', e => {
       console.log(`Secunda ${audio.currentTime} din ${audio.duration}`);
        audio.currentTime += 10;
    });

    document.querySelector('#incarcare').addEventListener('click', e => {
        audio.src = 'media/audio2.mp3';
        audio.load();
        audio.play();
    });

    audio.addEventListener('ended', e => {
        alert('Gata');
    });
}


document.addEventListener('DOMContentLoaded', app);
