
let timer;
let isRunning = false;
let workTime = 25 * 60;
let breakTime = 5 * 60; 
let remainingTime = workTime;
let completedSessions = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");
const sessionCount = document.getElementById("session-count");

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      playNotification();
      if (remainingTime === 0) {
        completedSessions++;
        sessionCount.textContent = completedSessions;
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  workTime = parseInt(workInput.value) * 60;
  breakTime = parseInt(breakInput.value) * 60;
  remainingTime = workTime;
  updateDisplay();
}

function playNotification() {
  const audio = new Audio("ding-126626.mp3");
  audio.play();
}

startButton.addEventListener("click", () => {
  if (!isRunning) startTimer();
});

resetButton.addEventListener("click", resetTimer);

workInput.addEventListener("input", () => {
  workTime = parseInt(workInput.value) * 60;
  remainingTime = workTime;
  updateDisplay();
});

breakInput.addEventListener("input", () => {
  breakTime = parseInt(breakInput.value) * 60;
});


updateDisplay();
