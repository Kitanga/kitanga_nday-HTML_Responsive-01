var muteAll = false;
var hasLoaded = false;
var isPlaying = false;
var isPlayingThrough = false;
var hasChoosenMuteDefault = false;
var count = 0;

var rythm = new Rythm();
rythm.addRythm('rythm-glitch1', 'shake', 4, 3, {
    direction: 'left',
    min: -7,
    max: 7
});
rythm.addRythm('rythm-glitch2', 'shake', 4, 3, {
    direction: 'right',
    min: -7,
    max: 7
});

var preloadAudio = new Audio();
preloadAudio.loop = true;
preloadAudio.oncanplay = () => {
    // if (!hasLoaded) {
    // }
    // preloadAudio.volume = 0.7;
    preloadAudio.play();
    rythm.connectExternalAudioElement(preloadAudio);
    rythm.start();
};
var muteBtn = document.getElementById('mute');

muteBtn.onclick = () => {
    stopPlayingForMute();
    stopMusic();
    muteAll = true;
    isPlaying = false;
    isPlayingThrough = false;
    showPlayBtn();
};

function warning_btn_clicked() {
    document.getElementById('preload-image').classList.remove('hidden');
    document.querySelector('.audio-warning').classList.add('hidden');

    // setInterval(() => {
    //     if (hasLoaded) {

    //     }
    // }, 1000);
}

// Onload event for page that hides the page's preloader upon finishing
function showPage() {
    document.querySelector('header').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');
    document.querySelector('.preloader').classList.add('hidden');
}
window.addEventListener('load', () => {
    setTimeout(() => {
        hasLoaded = true;
        if (hasChoosenMuteDefault) {
            preloadAudio.pause();
            showPage();
            preloadAudio.volume = 0;
        }
    }, 4000);
});

// Make all a tags with an href ref of "#" not do anything
document.querySelectorAll('a[href="#"]').forEach(ele => {
    ele.onclick = event => {
        event.preventDefault();
    };
});

document.getElementById('yes').onclick = () => {
    muteAll = false;
    hasChoosenMuteDefault = true;
    warning_btn_clicked();
    if (hasLoaded) {
        showPage();
    } else {
        // preloadAudio.src = "./media/PG S01 loop 2.ogg";
        preloadAudio.src = "./../../research/music/PG S01 loop 2.aac";
    }
};
document.getElementById('no').onclick = () => {
    muteAll = true;
    hasChoosenMuteDefault = true;
    warning_btn_clicked();
};

function stopMusic() {
    if (rythm.stopped === false) {
        rythm.stop();
    }
}

function stopPlayingForMute() {
    rythm.player.audio.pause();
    rythm.player.audio.currentTime = 0;
}

var startMusic = function () {
    if (!muteAll) {
        stopMusic();
        // rythm.connectExternalAudioElement(audio)
        rythm.setMusic(songs[count]);
        rythm.setGain(0.7);
        rythm.start();
    }
};

// Position vectors
var mouse = {
    x: 0,
    y: 0
};
var submitBtnRect = document.querySelector('.submit').getBoundingClientRect();

var submitBtn = {
    x: 0,
    y: 0
}
function getDistance() {

}