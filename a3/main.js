// variables
// store the current frame number/file name for background animation
let currentFrameNo = 1;
const header = document.querySelector("header");
const main = document.querySelector("main");

// store all the images in an array so the animation is smoother
// this code is based on a copilot suggestion
let images = [];
// do this until 100, increase variable 'frame' by 1 each time
for (let img = 1; img <= 100; img++) {
  // create new image object
  const frame = new Image();
  // make the image sources each number from 1-100
  frame.src = `./assets/${img}.png`;
  // put into array
  images[img] = frame;
}

// check if user is scrolling up or down
/* i am using wheel event rather than scroll so that it doesn't use native scrolling,
which was allowing the user to scroll at differnt speeds */
// listen for wheel event
// this change was suggested by copilot (i was initially using 'scroll' event)
window.addEventListener("wheel", (e) => {
  // prevent native scrolling
  e.preventDefault();
  // check if scroll deltaY positive (scrolling up))
  if (e.deltaY > 0) {
    // if so, call scroll up function
    scrollUp();
    // otherwise check if deltaY negative (scrolling down)
  } else if (e.deltaY < 0) {
    // if so, call scroll down function
    scrollDown();
  }
  fadeInText();
});

// Animation functions: change background frame number when scrolling up/down and update frame image. dont go past frame 100
/* the feedback of the animation moving as the user scrolls gives the user a unique
way to interact with the site, displaying new and intriguing uses of web design to entice
the user in my work */
/* this function could be potentially beneficial for future projects as it is successfull in immersing and enticing
viewers. it could also have the risk of sacrificing usability, as it doesnt allow text to be easily presented in a
straghtforward, accessible digestable way, and it isn't always very performant (i had to store the images in an array
to prevent flickering, for example) */

function scrollUp() {
  // check if frame number is below 100
  if (currentFrameNo < 100) {
    // increase frame number by 0.25, so that the animation is slower
    currentFrameNo = currentFrameNo + 0.25;
  } else {
    // otherwise, set frame number to 100
    currentFrameNo = 100;
  }
  // round down the current frame number so it matches an existing image file
  let roundedFrameUp = Math.floor(currentFrameNo);
  // update background image to current frame
  document.body.style.backgroundImage = `url(${images[currentFrameNo].src})`;
}

function scrollDown() {
  // check if frame number is above 1
  if (currentFrameNo > 1) {
    // decrease frame number by 0.25, so that the animation is slower
    currentFrameNo = currentFrameNo - 0.25;
  } else {
    // otherwise, set frame number to 1
    currentFrameNo = 1;
  }
  // round down the current frame number so it matches an existing image file
  let roundedFrameDown = Math.floor(currentFrameNo);
  // update background image to current frame
  document.body.style.backgroundImage = `url(${images[currentFrameNo].src})`;
}

// make text fade in at a certain frame
/* fading in text at certain times immerses the user, as the text reveals itself
through their interaction with the site. This could potentially be a great technqiue 
for creating immersive web experineces in future projects. However, it also sacrifices
some accessiblity due to the text not always being visible, and some users may not realise
they need to scroll to see the text
*/
function fadeInText() {
  // check if current frame number is between 25 and 50
  if (currentFrameNo >= 25 && currentFrameNo <= 50) {
    // if so, make the header text visible
    header.style.opacity = 1;
  } else {
    // otherwise make the header text invisible
    header.style.opacity = 0;
  }
  // check if current frame number is bigger than 60
  /*  as a portfolio for a designer, aiming to showcase groundbreaking web design, some
sacrifices are made in accessiblity/usability. However, the bio should be easy to read, so it
appears once the structure has been zoomed through so the text is agains a blank blue
surface */
  if (currentFrameNo > 60) {
    // if so, make the main text visible
    main.style.opacity = 1;
  } else {
    // otherwise make the main text invisible
    main.style.opacity = 0;
  }
}
