// local storage configuration
const addToLS = value => {
  localStorage.setItem("level", value);
}
const getDataFromLS = () => {
  if(localStorage.getItem("level")){
    const data = localStorage.getItem("level");
    return data;
  }
}

// game levels
const allLevels = {
  Easy: {
    seconds: 5,
    words: ["Better", "Beyond", "Carbon", "Cancer", "Bureau", "Choose", "Burden", "Common", "Entity", "Follow", "Formal", "League", "Policy", "Select", "Steady", "Wealth", "Wholly", "Wright", "Tissue", "Threat"]
  },
  Medium: {
    seconds: 3,
    words: ["absolute", "abstract", "academic", "autonomy", "bathroom", "boundary", "disaster", "dominant", "economic", "literary", "marriage", "proposal", "southern", "together", "whenever", "withdraw", "woodland", "symbolic", "province", "princess"]
  },
  Hard: {
    seconds: 2,
    words: ["Accurately", "Accusingly", "Administer", "Admittable", "Agreements", "Amplifiers", "Cephalopod", "Cheesecake", "Circulates", "Distension", "Doctorates", "Evacuation", "Extricable", "Fulfilling", "Gratefully", "Headwaters", "Magnitudes", "Paragraphs", "Regression", "Travelling"]
  }
}
let defaultLevelName = getDataFromLS();
let defaultLevelSeconds = allLevels[defaultLevelName].seconds;

// current level words
let words = allLevels[defaultLevelName].words;

// Query DOM
let startButton   = document.querySelector(".start");
let levelName     = document.querySelector(".level");
let levelSeconds  = document.querySelector(".level-seconds");
let theWord       = document.querySelector(".word");
let input         = document.querySelector("input");
let timeLeft      = document.querySelector(".time-left");
let yourScore     = document.querySelector(".score");
let totalScore    = document.querySelector(".total");
let upcomingWords = document.querySelector(".upcoming-words");
let theRandomWord = document.querySelector(".random-word");
let winBox        = document.querySelector(".win");
let loseBox       = document.querySelector(".lose");
let startsAfter   = document.querySelector(".after-seconds");
let startsAfterBox = document.querySelector(".start-holder");

// remove win or lose box
document.addEventListener("click", e => {
  if(e.target.classList.contains("great-btn")){
    let targetElement = e.target.dataset.target
    document.querySelector(`.${targetElement}`).classList.remove("show");
    // startsAfterBox.classList.remove("show-countdown");
    resetGame();
    yourScore.innerHTML = "0";
    /* totalScore.innerHTML = words.length; */
  }
  if(e.target.classList.contains("try-again-btn")){
    let targetElement = e.target.dataset.target
    document.querySelector(`.${targetElement}`).classList.remove("show");
    resetGame();
    startsAfter.innerHTML = "5";
    startsAfterBox.classList.add("show-countdown");
    const countDownTimer = setInterval(() => {
      startsAfter.innerHTML--;
      if(startsAfter.innerHTML == "0"){
        clearInterval(countDownTimer);
        startButton.click();
        startsAfterBox.classList.remove("show-countdown");
      }
    }, 1000);
  }
})

levelName.innerHTML = defaultLevelName;
levelSeconds.innerHTML = defaultLevelSeconds;
timeLeft.innerHTML = defaultLevelSeconds;
const totalNumberOfWords = allLevels[defaultLevelName].words;
totalScore.innerHTML = totalNumberOfWords.length

input.onpaste = () => {
  return false;
}

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  input.focus();
  generateWords();
});

const resetGame = () => {
  startButton.style.display = "block";
  upcomingWords.innerHTML = "";
  theRandomWord.innerHTML = "";
  input.value = "";
  upcomingWords.style.opacity = "0";
}
upcomingWords.style.opacity = "0";
const generateWords = () => {
  upcomingWords.style.opacity = "1";
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let index = words.indexOf(randomWord);
  words.splice(index, 1);
  theRandomWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for(let i = 0, n = words.length; i < n; i++){
    let div = document.createElement("div");
    div.className = "word";
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.append(div);
  }
  startPlaying();
}

const startPlaying = () => {
  timeLeft.innerHTML = defaultLevelSeconds;
  const start = setInterval(() => {
    timeLeft.innerHTML--;
    if(timeLeft.innerHTML == "0"){
      clearInterval(start);
      if(theRandomWord.innerHTML.toUpperCase() == input.value.trim().toUpperCase()){
        input.value = "";
        yourScore.innerHTML++;
        totalScore.innerHTML = words.length;
        if(words.length > 0){
          generateWords();
        }
        else{
          // win the game
          winBox.classList.add("show");
        }
      }
      else{
        // gameover 
        loseBox.classList.add("show");
      }
    }
  }, 1000);
}

// settings configuration
getDataFromLS();

let gameLevels = document.querySelector(".the-levels");
let levelsBox = document.querySelector(".setting-config");

levelsBox.addEventListener("click", e => {
  let levelsList = levelsBox.dataset.target;
  let levelsIcon = levelsBox.dataset.icon;
  
  document.querySelector(`.${levelsList}`).classList.toggle("show-levels");
  document.querySelector(`.${levelsIcon}`).classList.toggle("active");
});
let gameAllLevels = document.querySelectorAll(".the-levels ul li");
let levelNamePlaceholder = document.querySelector(".setting-config .placeholder");
levelNamePlaceholder.innerHTML = getDataFromLS();
gameAllLevels.forEach(lvl => {
  lvl.addEventListener("click", e => {
    let placeholder = e.target.innerHTML;
    levelNamePlaceholder.innerHTML = placeholder;
    addToLS(placeholder);
  });
});

// show settings box
let settingsIcon = document.querySelector(".header-holder .config .game-setting");
settingsIcon.addEventListener("click", () => {
  document.querySelector(`.${settingsIcon.dataset.target}`).classList.toggle("show");
});
let closeSettings = document.querySelector(".settings .close");
closeSettings.addEventListener("click", () => {
  const settingBox = closeSettings.getAttribute("data-target");
  document.querySelector(`.${settingBox}`).classList.toggle("show");
  location.href = "/index.html";
});
