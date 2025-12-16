/* Vinyl Music Player Logic */

const playlist = [
    {
        title: "Fly Me To The Moon",
        artist: "Frank Sinatra",
        file: "assets/audio/fly_me_to_the_moon.mp3",
        cover: "assets/images/vinyl-cover-1.jpg" // Placeholder or generate
    },
    {
        title: "My Way",
        artist: "Frank Sinatra",
        file: "assets/audio/my_way.mp3",
        cover: "assets/images/vinyl-cover-2.jpg"
    },
    {
        title: "What A Wonderful World",
        artist: "Louis Armstrong",
        file: "assets/audio/what_a_wonderful_world.mp3",
        cover: "assets/images/vinyl-cover-3.jpg"
    },
    {
        title: "Take Five",
        artist: "Dave Brubeck",
        file: "assets/audio/take_five.mp3",
        cover: "assets/images/vinyl-cover-4.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();
let isMinimized = true;

// DOM Elements (will be selected after DOM loads)
let playerContainer, vinylRecord, playBtn, prevBtn, nextBtn, trackTitle, trackArtist, toggleBtn, progressBar, progressContainer;

function initPlayer() {
    // Inject HTML Structure if not present (or assume existing in index.html - sticking to plan: Inject via JS or HTML? Plan said "Integrate into index.html", I will create separate file but let's assume I write the HTML in index.html. Wait, I can inject it here to be cleaner)
    // Actually, creating the elements in JS is cleaner for "drag and drop" installation.

    // Select elements
    playerContainer = document.querySelector('.music-player-container');
    if (!playerContainer) return; // Guard clause

    vinylRecord = playerContainer.querySelector('.vinyl-record');
    playBtn = playerContainer.querySelector('.play-btn');
    prevBtn = playerContainer.querySelector('.prev-btn');
    nextBtn = playerContainer.querySelector('.next-btn');
    trackTitle = playerContainer.querySelector('.track-title');
    trackArtist = playerContainer.querySelector('.track-artist');
    toggleBtn = playerContainer.querySelector('.player-toggle');
    progressBar = playerContainer.querySelector('.progress-bar');
    progressContainer = playerContainer.querySelector('.progress-container');

    // Load first track
    loadTrack(currentTrackIndex);

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    toggleBtn.addEventListener('click', togglePlayerSize);

    // Progress Bar Click
    progressContainer.addEventListener('click', setProgress);

    // Error handling for missing files
    audio.addEventListener('error', (e) => {
        console.warn("Audio file not found. Please upload to assets/audio/", audio.src);
        trackTitle.textContent = "File Not Found";
        trackArtist.textContent = "Please upload .mp3";
    });
}

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.file;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    // Reset progress
    if (progressBar) progressBar.style.width = '0%';
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        vinylRecord.classList.remove('spinning');
        playBtn.innerHTML = '▶'; // Play icon
    } else {
        audio.play().then(() => {
            vinylRecord.classList.add('spinning');
            playBtn.innerHTML = '⏸'; // Pause icon
        }).catch(err => {
            console.error("Playback failed (likely missing file):", err);
            alert("Audio file missing! Please upload mp3s to assets/audio/");
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
    if (isPlaying) togglePlay(); // Restart playback logic
    togglePlay(); // Force play
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
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function togglePlayerSize() {
    isMinimized = !isMinimized;
    playerContainer.classList.toggle('minimized');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initPlayer);
