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
var playBtn = document.getElementById('play');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');
var muteBtn = document.getElementById('mute');

function showPlayBtn() {
    document.getElementById('play-icon').classList.remove('fa-pause');
    document.getElementById('play-icon').classList.add('fa-play');
}

function showPauseBtn() {
    document.getElementById('play-icon').classList.remove('fa-play');
    document.getElementById('play-icon').classList.add('fa-pause');
}

function turnOffMuteAll() {
    // If the user previously muted the sound (e.g. during the first screen view, then we unmute and play music)
    if (muteAll) {
        muteAll = false;
    }
}

function isNowPlaying() {
    isPlaying = true;
    isPlayingThrough = true;
}

playBtn.onclick = () => {
    turnOffMuteAll();
    // If the user hasn't started the song, then we start the song from the start
    if (!isPlayingThrough) {
        startMusic();
    }

    if (!isPlaying) {
        isNowPlaying();
        rythm.player.audio.play();

        showPauseBtn();
    } else {
        // Pause the song
        isPlaying = false;
        isPlayingThrough = true;
        rythm.player.audio.pause();

        showPlayBtn();
    }
};
prevBtn.onclick = () => {
    turnOffMuteAll();
    showPauseBtn();
    isNowPlaying();
    
    document.querySelector('.focuser').classList.remove('song' + (count + 1));
    if (--count < 0) {
        count = 3;
    }
    // Do not move this code above the code above. A class is added to the focuser element in the startMusic().
    stopMusic();
    startMusic();
};
nextBtn.onclick = () => {
    turnOffMuteAll();
    showPauseBtn();
    isNowPlaying();
    
    document.querySelector('.focuser').classList.remove('song' + (count + 1));
    if (++count > 3) {
        count = 0;
    }
    // Do not move this code above the code above. A class is added to the focuser element in the startMusic().
    stopMusic();
    startMusic();
};

muteBtn.onclick = () => {
    stopPlayingForMute();
    stopMusic();
    muteAll = true;
    isPlaying = false;
    isPlayingThrough = false;
    showPlayBtn();
};

window.onkeydown = event => {
    var keyCode = event.keyCode;
    if (keyCode === 32) {
        // Space key pressed
        playBtn.click();
    } else if (keyCode === 78 || keyCode === 39) {
        // N or right arrow key pressed
        nextBtn.click();
    } else if (keyCode === 80 || keyCode === 37) {
        // P or left arrow key pressed
        prevBtn.click();
    }
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
        preloadAudio.src = "./../research/music/PG S01 loop 2.aac";
    }
};
document.getElementById('no').onclick = () => {
    muteAll = true;
    hasChoosenMuteDefault = true;
    warning_btn_clicked();
};

var playerCount = 0;
var songTotal = 4;

var songs = [
    "./media/m4a/Power Glove - Motorcycle Cop (Ultra HQ).m4a",
    "./media/m4a/9th Dimension - Trials of the Blood Dragon.m4a",
    "./media/m4a/NightForce.m4a",
    "./media/m4a/Far Cry 3_ Blood Dragon OST - Power Core (Track 07).m4a"
];

var songInfo = [
    "Motorcycle Cop",
    "9th Dimension",
    "Nightforce",
    "Power Core"
];

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

        document.querySelector('.focuser').classList.add('song' + (count + 1));
        document.querySelector('.player h1').innerText = songInfo[count];
    }
};

document.querySelector('.focuser').onclick = () => {
    if (!document.querySelector('header').classList.contains('focus')) {
        document.querySelector('header').classList.add('focus');
        document.querySelector('footer').classList.add('focus');
    } else {
        document.querySelector('header').classList.remove('focus');
        document.querySelector('footer').classList.remove('focus');
    }
};