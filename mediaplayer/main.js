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
const albumArt = document.querySelector("#albumArt");
const shuffleButton = document.querySelector("#shuffleButton");
let shuffle = "false";
let songHistory = [];
const volumeSlider = document.querySelector("#volumeSlider");
const volIcon = document.querySelector("#volIcon");

// when JS loads remove default controls
audioElement.removeAttribute("controls");

// i want to update total time based on the currently loaded media file
// this will run when the page loads but if i wanted to change the file afterwards, i'd have to
// update there too

audioElement.addEventListener("canplay", updateTotalTime);

function updateTotalTime() {
  // save the duration of the loaded audio file in seconds
  let audioSeconds = audioElement.duration;
  // divide it by minutes (60s) and round it down to the nearest whole number
  let totalMin = Math.floor(audioSeconds / 60);
  // get the remaininder after dividing by 60, and round it down to nearest whole number
  let totalSec = Math.floor(audioSeconds % 60);
  // if seconds is below 10, add and extra 0 so it is two digits
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  // make the text content of the total time the minutes:seconds
  totalTimeText.textContent = `${totalMin}:${totalSec}`;
}

function updateCurrentTime() {
  // save the current time of playback in seconds
  let audioSeconds = audioElement.currentTime;
  // divide it by minutes (60s) and round it down to the nearest whole number
  let totalMin = Math.floor(audioSeconds / 60);
  // get the remaininder after dividing by 60, and round it down to nearest whole number
  let totalSec = Math.floor(audioSeconds % 60);
  // if seconds is below 10, add and extra 0 so it is two digits
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  // make the text content of the total time the minutes:seconds
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

/* 
Skip Back behaviour:
- Check if song is first in playlist (array)
- If not, go back 1 songnumber in array
- Call media button function to make sure play/pause button is set appropriately
- If yes, loop around to last song in array
- Call media button function to make sure play/pause button is set appropriately
*/

function skipBack() {
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
}

/* 
since shuffle was introduced, this should be the new behaviour for skip back button:
- check if there are any songs in history array
- if there are, play the last song in the array
- if there aren't, play the last song in the playlist
*/

// call function when skip back is pressed
skipBackButton.addEventListener("click", (e) => {
  // check if there are any songs in the song history array
  if (songHistory.length > 0) {
    // if there are, save the last song in the array to a variable and delete it from the array
    const lastSong = songHistory.pop();
    // make the current song the last song played
    updateCurrentSong(lastSong);
    currentSongNumber = lastSong;
  } else {
    // if not, call the regular skip back function (which just cycles through the playlist...)
    skipBack();
  }
});

/* 
Skip Next behaviour:
- Check if song is last in playlist (array)
- If not, go forward 1 songnumber in array
- Call media button function to make sure play/pause button is set appropriately
- If no, loop around to first song in array
- Call media button function to make sure play/pause button is set appropriately
*/

function skipNext() {
  // save the last song in array
  songHistory.push(currentSongNumber);
  // check if song is last in array
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
}

// SkipNextButton should go to next song if shuffle is off, and go to a random song if shuffle is on

// call function when skip forward is pressed
skipNextButton.addEventListener("click", (e) => {
  // check if shuffle is set to true
  if (shuffle === "true") {
    // if so, play the shuffle next function
    shuffleNext();
  } else {
    // otherwise, play the regular skip next function
    skipNext();
  }
  // call skipnext function
});

/*
Timeline behaviour:
it should update as media playback occurs to show current time
i should be able to click and jump to a particular time
*/

function updateTimeline() {
  // calculate percentage of total time
  let timePercent = (audioElement.currentTime / audioElement.duration) * 100;
  // make timeline value this percentage
  // added isFinite if-else check, if value not finite changes to 0. This prevents infinite values (which were returning an error in console)
  if ((timeline.value = isFinite(timePercent))) {
    timeline.value = timePercent;
  } else {
    timeline.value = 0;
  }
  updateCurrentTime();
}

// event listener on audio element calls updateTimeline function whenever time changes in audio element
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

// call this function whenever a song has ended in the audio element
audioElement.addEventListener("ended", (e) => {
  // check if shuffle is enabled
  if (shuffle === "true") {
    // if so, call shuffle next function
    shuffleNext();
  } else {
    // if not, call regular next song on end function
    playNextOnEnd();
  }
});

function playNextOnEnd() {
  // save the last song in array
  songHistory.push(currentSongNumber);
  // check if current song is last in array
  if (currentSongNumber < songArray.length - 1) {
    // if not, change the current song in array to the next one (current song + 1)
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
  } else {
    // if not, loop back to the start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
  }
}

/*
Shuffle behaviour:
- Create a random number between 0 and 3
- change the current song number to that value
*/

function shuffleNext() {
  // save the last song in array
  songHistory.push(currentSongNumber);
  // create a random number between 0 and 1, multiply it by 4 and round it down to the nearest whole number
  const randomSong = Math.floor(Math.random() * 4);
  // update the current song to this randomised value
  updateCurrentSong(randomSong);
  currentSongNumber = randomSong;
}

// Create an array from the tracklist
const listItems = Array.from(trackList.children);

trackList.addEventListener("click", (e) => {
  // when click song on tracklist, first save the current song to the song history array
  songHistory.push(currentSongNumber);
  // get item clicked of tracklist array
  const clickedItem = listItems.indexOf(e.target);
  // update the current song to the tracklist array item clicked
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
  nowPlaying.style.backgroundColor = "var(--colour-03)";
  nowPlaying.style.borderRadius = "0.5rem";
  // now call function to check if media is playing, and adjust button image accordingly
  mediaButton();
}

//start function when user plays
audioElement.addEventListener("play", trackIndicator);

// change currentSong text box to currently playing song
// call the function when audio element is playing
audioElement.addEventListener("play", (e) => {
  // save to a variable: the text content of the currently playing song in the tracklist array
  let songTitle = listItems[currentSongNumber].textContent;
  // change the text content in the currentSong paragraph to the songTitle variable
  currentSong.textContent = songTitle;
});

// store credits info about each song in an array
const infoArray = [
  "Credits: <br> Writer: P-Hase <br> Producer: P-Hase <br> Performer: P-Hase",
  "Credits: <br> Writer: P-Hase, Ben Snaath <br> Producer: P-Hase <br> Performer: P-Hase, Ben Snaath",
  "Credits: <br> Writer: P-Hase <br> Producer: P-Hase <br> Perfomer: P-Hase",
  "Credits: <br> Writer: P-Hase <br> Producer: P-Hase <br> Performer: P-Hase",
];

// add a click event listener to each individual info button. Save the index of this button
infoButton.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    /* 
    stopPropagation prevents the event from effecting other parent elements. 
    The event was previously interrupting the audioElement.
    */
    e.stopPropagation();
    // show the info modal
    infoModal.showModal();
    // change the content of the info modal to the infoArray content matching the selected button index
    infoText.innerHTML = infoArray[index];
  });
});

// close the info modal when close button is pressed
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  infoModal.close();
});

// store album art
const artArray = [
  "./assets/art_one.jpg",
  "./assets/art_two.jpg",
  "./assets/art_three.jpg",
  "./assets/art_four.jpg",
];

// change album art to currently playing song
// start function when audio element plays
audioElement.addEventListener("play", (e) => {
  // save the content of the artArray index matching the current song number
  let currentArt = artArray[currentSongNumber];
  // change the album art src to this content (url)
  albumArt.src = currentArt;
});

// call function when shuffle button is pressed
shuffleButton.addEventListener("click", (e) => {
  // check if shuffle is enabled
  if (shuffle === "false") {
    // if it isnt, make the image darker for feedback, and change shuffle varable to true
    shuffleButton.style.filter = "brightness(0.5)";
    shuffle = "true";
  } else {
    // if it is, make the image full brightness for feedback, and change shuffle variable to false
    shuffleButton.style.filter = "brightness(1)";
    shuffle = "false";
  }
});

// check for user input into the volume slider
volumeSlider.addEventListener("input", (e) => {
  // as audioelement volume value from 0-1, adjust the colume of the audio element to this value divided by 100
  audioElement.volume = volumeSlider.value / 100;
});

// listen for click interaction with volume icon
volIcon.addEventListener("click", (e) => {
  // check if audioelement is muted
  if (audioElement.muted === true) {
    // if so, change muted to false
    audioElement.muted = false;
    // change icon src and alt text to audio (unmuted) icon
    volIcon.src = "./assets/audio.png";
    volIcon.alt = "audio icon";
  } else {
    // if not, change muted to true
    audioElement.muted = true;
    // change icon src and alt text to mute icon
    volIcon.src = "./assets/mute.png";
    volIcon.alt = "mute icon";
  }
});
