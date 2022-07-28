const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");


let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    };
    playBtn.innerText = video.paused ? "Play" : "Pause"
};

const handleMute = (e) => {
    if(video.muted){
        video.muted = false;
    }else {
        video.muted = true;
    };
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
    const {target: {value}} = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";ss
    }
    volumeValue = value;
    video.volume = value;
}

const handleLoadedMetadata = () => {
    totalTime.innerText = Math.floor(video.duration);

};
const handleTimeUpdate = () => {
    currenTime.innerText = Math.floor(video.currentTime);
} 

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata)
video.addEventListener("timeupdate",handleTimeUpdate)