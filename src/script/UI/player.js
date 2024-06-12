import {dataMusic} from "../Utils/dataMusic.js"

const likeTrack = document.querySelector('.like-track-img');
const likeTrackImg = document.querySelector('.like-track-img');
const track = document.getElementById("track");
const trackArtist = document.getElementById("track-artist");
const trackTitle = document.getElementById("track-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const trackImg = document.querySelector(".img-track");
const trackGenre = document.querySelector("#track-genre");
const ppImg = document.querySelector(".player-page-img");

const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next-track");
const prev = document.getElementById("prev-track");
const stop = document.getElementById("stop");
const back = document.getElementById("back10");
const forward = document.getElementById("forward10");

export let trackIndex = 0;

let playing = false;

const checkTrackLike = (track) => {
    let favoriteTracks = getFavoriteTracks();
    
    return favoriteTracks.some(favTrack => favTrack.title === track.title);
}

const tracks = dataMusic;

export function loadTrack(index) {
    if (checkTrackLike(tracks[index])) {
        likeTrackImg.src = "../assets/icons/like.png";
    } else {
        likeTrackImg.src = "../assets/icons/heart.png";
    }

    setProgress();
    ppImg.src = "../assets/images/tracks/" + tracks[index].img;
    track.src = tracks[index].url;
    trackArtist.textContent = tracks[index].artist;
    trackTitle.textContent = tracks[index].title;
    trackGenre.textContent = tracks[index].genre;
    trackImg.src = "../assets/images/tracks/" + tracks[index].img;
    updateProgress();
}

function playPauseTrack() {
    if (playing) {
        track.pause();
        play.style.display = "flex";
        pause.style.display = "none";
    } else {
        track.play();
        play.style.display = "none";
        pause.style.display = "flex";
    }
    playing = !playing;
}

function stopTrack() {
    track.pause();
    track.currentTime = 0;
    play.style.display = "flex";
    pause.style.display = "none";
    playing = false;
}

function changeTrack(direction) {
    trackIndex = (trackIndex + direction + tracks.length) % tracks.length;
    loadTrack(trackIndex);
    updateProgress();
    if (playing) track.play();
}

function skip(seconds) {
    track.currentTime += seconds;
}

function updateProgress() {
    progressBar.max = track.duration;
    progressBar.value = track.currentTime;
    currentTime.textContent = formatTime(track.currentTime);
    if (isNaN(track.duration)) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTime(track.duration);
    }
}

function setProgress() {
    track.currentTime = progressBar.value;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

play.addEventListener("click", playPauseTrack);
pause.addEventListener("click", playPauseTrack);
stop.addEventListener("click", stopTrack);
prev.addEventListener("click", () => changeTrack(-1));
next.addEventListener("click", () => changeTrack(1));
back.addEventListener("click", () => skip(-10));
forward.addEventListener("click", () => skip(10));
progressBar.addEventListener("input", setProgress);
track.addEventListener("timeupdate", updateProgress);
track.addEventListener("ended", () => changeTrack(1));

loadTrack(trackIndex);

const openPP = document.querySelector('.img-open-pp'); // pp = player-page
const playerPage = document.querySelector('.player-page');
const body = document.body; // Додано, щоб уникнути помилки з body
const player = document.querySelector('.player');
openPP.addEventListener("click", () => {
    if (playerPage.classList.contains("show")) {
        playerPage.classList.remove("show");
        openPP.classList.remove("show");
        body.style.overflow = "visible";
        if(window.screen.availWidth <= 768){
            player.classList.remove("show")
        }
    } else {
        playerPage.classList.add("show");
        openPP.classList.add("show");
        body.style.overflow = "hidden";
        if(window.screen.availWidth <= 768){
            player.classList.add("show")
        }
    }
})

export function getFavoriteTracks() {
    const favoriteTracks = localStorage.getItem('favoriteTracks');
    return favoriteTracks ? JSON.parse(favoriteTracks) : [];
}

function saveFavoriteTracks(favoriteTracks) {
    localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracks));
}

function toggleFavorite() {
    let favoriteTracks = getFavoriteTracks();
    const isFavorite = favoriteTracks.some(favTrack => favTrack.title === tracks[trackIndex].title);
    if (isFavorite) {
        favoriteTracks = favoriteTracks.filter(favTrack => favTrack.title !== tracks[trackIndex].title);
        likeTrackImg.src = "../assets/icons/heart.png";
    } else {
        console.log(trackIndex)
        const favoriteTrack = {
            src: track.src,
            artist: trackArtist.textContent,
            title: trackTitle.textContent,
            img: (trackImg.src).split('/').pop(),
            id: trackIndex
        };
        favoriteTracks.push(favoriteTrack);
        likeTrackImg.src = "../assets/icons/like.png";
    }
    saveFavoriteTracks(favoriteTracks);
}

likeTrack.addEventListener("click", () => {
    toggleFavorite();
});
