// find the elements i want to interact with
const audioElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");
const playPauseIcon = document.querySelector("#playPauseIcon");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");
const mediaSource = document.querySelector("#mediaSource");
const skipBackButton = document.querySelector("#skipBackButton");
const skipNextButton = document.querySelector("#skipNextButton");
const trackList = document.querySelector("#trackList");
const currentSong = document.querySelector("#currentSong");
let infoModal = document.getElementById("infoDialog");
const infoButton = document.querySelectorAll(".infoButton");
const infoText = document.querySelector("#infoText");

// when JS loads remove default controls
audioElement.removeAttribute("controls");

// i want to update total time based on the currently loaded media file
// this will run when the page loads but if i wanted to change the file afterwards, i'd have to
// update there too

audioElement.addEventListener("canplay", updateTotalTime);

function updateTotalTime() {
  let audioSeconds = audioElement.duration;
  let totalMin = Math.floor(audioSeconds / 60);
  let totalSec = Math.floor(audioSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  totalTimeText.textContent = `${totalMin}:${totalSec}`;
}

function updateCurrentTime() {
  let audioSeconds = audioElement.currentTime;
  let totalMin = Math.floor(audioSeconds / 60);
  let totalSec = Math.floor(audioSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  currentTimeText.textContent = `${totalMin}:${totalSec}`;
}

/* 
play/pause button behaviour:
if media is not playing -  when i click it begins playback of the media file
if media is playing - when i click again it pauses playback of the media file 
feedback: 
toggle icon based on playing state
cursor change on hover
*/

function playPause() {
  // check if audio element is currently paused or ended
  if (audioElement.paused || audioElement.ended) {
    // if so, play audio and change the icon to pause
    audioElement.play();
    playPauseIcon.src = "./assets/pause--v2.png";
    playPauseIcon.alt = "pause icon";
  } else {
    // if not, pause the audio and change the icon to play
    audioElement.pause();
    playPauseIcon.src = "./assets/play--v2.png";
    playPauseIcon.alt = "play icon";
  }
}

// this function checks if the media is playing and changes the button image
function mediaButton() {
  // check if media is paused
  if (audioElement.paused) {
    // change icon to play icon
    playPauseIcon.src = "./assets/play--v2.png";
    playPauseIcon.alt = "play icon";
  } else {
    // if else, change to pause icon
    playPauseIcon.src = "./assets/pause--v2.png";
    playPauseIcon.alt = "pause icon";
  }
}

// call playPause function on play button press
playPauseButton.addEventListener("click", playPause);

// call playPause function on spacebar press
// event listener on any key pressed
document.addEventListener("keydown", (e) => {
  // check if key is the space bar
  if (e.key === " ") {
    // stop the page from scrolling down
    event.preventDefault();
    // call the playpause function
    playPause();
  }
});

// call function when skip back is pressed
skipBackButton.addEventListener("click", (e) => {
  // check if current song is first in array
  if (currentSongNumber > 0) {
    // if not, go back one track
    updateCurrentSong(currentSongNumber - 1);
    currentSongNumber -= 1;
    // call function to check if media is playing, and adjust button image accordingly
    mediaButton();
  } else {
    // otherwise, loop back to end of array
    updateCurrentSong(songArray.length - 1);
    currentSongNumber = songArray.length - 1;
    // call function to check if media is playing, and adjust button image accordingly
    mediaButton();
  }
});

// call function when skip forward is pressed
skipNextButton.addEventListener("click", (e) => {
  // check if current song is last in array
  if (currentSongNumber < songArray.length - 1) {
    // if not, go forward one track
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
    // call function to check if media is playing, and adjust button image accordingly
    mediaButton();
  } else {
    // otherwise, loop back to start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
    // call function to check if media is playing, and adjust button image accordingly
    mediaButton();
  }
});

/*
Timeline behaviour:
it should update as media playback occurs to show current time
i should be able to click and jump to a particular time
*/

function updateTimeline() {
  // find percentage of total time
  let timePercent = (audioElement.currentTime / audioElement.duration) * 100;
  timeline.value = timePercent;
  updateCurrentTime();
}

audioElement.addEventListener("timeupdate", updateTimeline);

// find when i click my timeline and then jump to appropriate time
timeline.addEventListener("click", jumpToTime);

function jumpToTime(ev) {
  // find how far from the left we clicked
  let clickX = ev.offsetX;
  // find how wide my timeline is
  let timelineWidth = timeline.offsetWidth;
  // find the ratio of click to width
  let clickPercent = clickX / timelineWidth;
  // update my timeline
  audioElement.currentTime = audioElement.duration * clickPercent;
}

// add feature to play next song after current one finished

// keep track of current song selection
let currentSongNumber = 0;

// store all the different songs
const songArray = [
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
];

function updateCurrentSong(songNumber) {
  // based on the input number, change out the src of our source
  mediaSource.src = songArray[songNumber];
  // then we want to load new file
  audioElement.load();
  // then begin playback
  audioElement.play();
}

audioElement.addEventListener("ended", playNextOnEnd);

function playNextOnEnd() {
  if (currentSongNumber < songArray.length - 1) {
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
  } else {
    // loop back to start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
  }
}

// Create an array from the tracklist
const listItems = Array.from(trackList.children);

// when click on array, get array item clicked
trackList.addEventListener("click", (e) => {
  const clickedItem = listItems.indexOf(e.target);
  // update the current song to the array item clicked
  updateCurrentSong(clickedItem);
  currentSongNumber = clickedItem;
});

// this function will highlight the name of the track currently playing
function trackIndicator() {
  // remove the background colour for each element
  listItems.forEach((element) => {
    element.style.backgroundColor = "";
  });
  // find the array item of the track name currently playing
  let nowPlaying = listItems[currentSongNumber];
  //set the background colour and the border radius
  nowPlaying.style.backgroundColor = "#272626";
  nowPlaying.style.borderRadius = "0.5rem";
  // now call function to check if media is playing, and adjust button image accordingly
  mediaButton();
}

//start function when user plays
audioElement.addEventListener("play", trackIndicator);

// change currentSong text box to currently playing song
// start function when audio element plays
audioElement.addEventListener("play", (e) => {
  let songTitle = listItems[currentSongNumber].textContent;
  currentSong.textContent = songTitle;
});

// store infor about each song
const infoArray = [
  "Writer: John Doe <br> Producer: Jane Doe",
  "Writer: John Doe feat. Ben Snaath <br> Producer: John Doe",
  "Writer: Jim Doe <br> Producer: Play Doe",
  "Writer: Jane Doe <br> Guitar: Kieth Richards <br> Producer: John Doe",
];

// show info modal when info button is clicked
infoButton.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    infoModal.showModal();
    infoText.innerHTML = infoArray[index];
  });
});

// check what song the info button was pressed on
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  infoModal.close();
});
