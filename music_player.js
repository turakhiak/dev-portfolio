/* Vinyl Music Player Logic */

const playlist = [
    {
        title: "West End Blues (1928)",
        artist: "Louis Armstrong",
        file: "assets/audio/west_end_blues.mp3",
        cover: "assets/images/vinyl-cover-1.jpg"
    },
    {
        title: "Potato Head Blues (1927)",
        artist: "Louis Armstrong & His Hot Seven",
        file: "assets/audio/potato_head_blues.mp3",
        cover: "assets/images/vinyl-cover-2.jpg"
    },
    {
        title: "Muskrat Ramble (1926)",
        artist: "Louis Armstrong & His Hot Five",
        file: "assets/audio/muskrat_ramble.mp3",
        cover: "assets/images/vinyl-cover-3.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();
let isMinimized = true;

// DOM Elements
let playerContainer, vinylRecord, playBtn, prevBtn, nextBtn, trackTitle, trackArtist, toggleBtn, progressBar, progressContainer;

function initPlayer() {
    playerContainer = document.querySelector('.music-player-container');
    if (!playerContainer) return;

    vinylRecord = playerContainer.querySelector('.vinyl-record');
    playBtn = playerContainer.querySelector('.play-btn');
    prevBtn = playerContainer.querySelector('.prev-btn');
    nextBtn = playerContainer.querySelector('.next-btn');
    trackTitle = playerContainer.querySelector('.track-title');
    trackArtist = playerContainer.querySelector('.track-artist');
    toggleBtn = playerContainer.querySelector('.player-toggle');
    progressBar = playerContainer.querySelector('.progress-bar');
    progressContainer = playerContainer.querySelector('.progress-container');

    // Load first track but DO NOT auto-play (browser policy)
    loadTrack(currentTrackIndex);

    // Event Listeners
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevTrack();
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextTrack();
    });
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayerSize();
    });
    progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        setProgress(e);
    });

    // Error handling
    audio.addEventListener('error', (e) => {
        console.error("Audio Load Error:", audio.error);
        const errorMsg = `Error: ${audio.error ? audio.error.message : 'Unknown'}`;
        trackArtist.textContent = errorMsg;
        vinylRecord.classList.remove('spinning');
        playBtn.innerHTML = '▶';
        isPlaying = false;
    });

    // Handle clicks on vinyl to open/close
    vinylRecord.addEventListener('click', (e) => {
        e.stopPropagation();
        // If we click the record while it's minimized, we expand it
        // If it's already expanded, we toggle play/pause
        if (playerContainer.classList.contains('minimized')) {
            togglePlayerSize();
        } else {
            togglePlay();
        }
    });

    // Attempt auto-play and interaction fallback
    const playAttempt = () => {
        if (isPlaying) return;
        audio.play().then(() => {
            vinylRecord.classList.add('spinning');
            playBtn.innerHTML = '⏸';
            isPlaying = true;
            document.removeEventListener('click', playAttempt);
            document.removeEventListener('keydown', playAttempt);
        }).catch(err => {
            console.log("Auto-play blocked, waiting for interaction");
        });
    };

    // Try immediately
    playAttempt();

    // Fallback: play on first click or keydown anywhere
    document.addEventListener('click', playAttempt);
    document.addEventListener('keydown', playAttempt);
}

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.file;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    if (progressBar) progressBar.style.width = '0%';
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        vinylRecord.classList.remove('spinning');
        playBtn.innerHTML = '▶';
    } else {
        audio.play().then(() => {
            vinylRecord.classList.add('spinning');
            playBtn.innerHTML = '⏸';
        }).catch(err => {
            console.error("Playback failed:", err);
        });
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = playlist.length - 1;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) togglePlay();
    togglePlay();
}

function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex > playlist.length - 1) {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) togglePlay();
    togglePlay();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (!isNaN(duration)) {
        audio.currentTime = (clickX / width) * duration;
    }
}

function togglePlayerSize() {
    isMinimized = !isMinimized;
    playerContainer.classList.toggle('minimized');
}

document.addEventListener('DOMContentLoaded', initPlayer);
