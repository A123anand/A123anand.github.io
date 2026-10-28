// Complete variable definitions and random function

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

//  Raw text strings

const characters = ["W the goat", "D a tiny dinosaur", "the orange bear"];
const places = ["living room", "amusement park", "the park"];
const events = [
  "fell asleep and woke up in a different dimension",
  "got transported to a chocolate factory",
  "woke up from a dream",
];


function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `It was a cold day, so ${randomCharacter} went out to ${randomPlace}. When they got to ${randomPlace}, they stared around, then ${randomEvent}. Stew and Olivia  recorded the the whole thing, but was not surprised.`;

  return storyText;
}


generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Olivia ", name);
  }
  if (document.getElementById("uk").checked) {
    const name = customName.value;
    newStory = newStory.replace("Stew ", "Olivia ");
    newStory = newStory.replace("Stew ", name);

  }
  story.textContent = newStory;
  story.style.visibility = "visible";
}