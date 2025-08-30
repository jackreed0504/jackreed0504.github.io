// we can use window to find certain properties
let windowWidth = window.innerWidth;
// console.log(windowWidth);
// find out information about url location
// console.log(window.location);
// document can be used to find html elements
// console.log(document.title);
// set the title
// document.title = "new title";
// can find the body
// document.body.style.backgroundColor = "red"
// navigator can find more details of hardware/software
// console.log(window.navigator.userAgent);

const myImage = document.querySelector("#myImage");

console.log(myImage);

const helloParagraph = document.querySelector("#hello");

const myParagraphs = document.querySelectorAll("p");

console.log(myParagraphs);

myParagraphs.forEach(changeParaBG);

function changeParaBG(item) {
  console.log(item);
  item.style.backgroundColor = "red";
}

// first find content of hello p
console.log(helloParagraph.textContent);

function updateCatName() {
  helloParagraph.textContent = `Hi! My name is ${myImage.dataset.catname}`;
  // classList.add() adds a class
  // classList.remove() removes a class
  // classList.toggle() toggles a class
  myImage.classList.toggle("round");
}

// find outer section
const outerSection = document.querySelector(".outer");

const myButton = document.querySelector("#my-button");

// add an eventlistener to button
// this is using an anon function
myButton.addEventListener("click", function () {
  alert("button is clicked");
});
//could be written as an arrow function
// () => {}
// same as fuction() {}

// create element using document methods
const newPara = document.createElement("p");
newPara.textContent = "I'm a new paragraph!";
newPara.classList.add("coral-box");
outerSection.appendChild(newPara);
//myButton.appendChild(myButton);

//look at paragraph in console
console.log(newPara);

//add new element to header
const myHeader = document.querySelector("header");
let catName = myImage.dataset.catname;
myHeader.innerHTML += `<h2>I think ${catName} is pretty cool</h2>`;

// += works for maths too
let x = 0;
x = x + 2;
x += 4;

// add mouseenter eventlistener to img
myImage.addEventListener("mouseenter", addRoundClass);

function addRoundClass() {
  myImage.classList.add("round");
}
myImage.addEventListener("mouseleave", removeRoundClass);

function removeRoundClass() {
  myImage.classList.remove("round");
}
