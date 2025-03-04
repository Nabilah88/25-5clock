// Button variables
const breakIncrementButton = document.getElementById('break-increment');
const breakDecrementButton = document.getElementById('break-decrement');
const sessionIncrementButton = document.getElementById('session-increment');
const sessionDecrementButton = document.getElementById('session-decrement');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');

// Display variables
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById("timer-label");

// Timer variables
let timer;
let timerStatus = "stopped";
let isSession = true;

// Default times
const defaultSessionTime = 25;
const defaultBreakTime = 5;
let sessionTime = defaultSessionTime;
let breakTime = defaultBreakTime;

timeLeft.innerText = formatTime(sessionTime);
breakLength.innerText = breakTime;
sessionLength.innerText = sessionTime;

// Audio for beep sound
const beep = document.getElementById("beep");

startStopButton.addEventListener("click", () => {
    if (timerStatus === "stopped") {
        timerStatus = "running";
        startTimer();
    } else {
        timerStatus = "stopped";
        clearInterval(timer);
    }
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timerStatus = "stopped";
    sessionTime = defaultSessionTime;
    breakTime = defaultBreakTime;
    isSession = true;
    timerLabel.innerText = "Session";
    timeLeft.innerText = formatTime(sessionTime);
    breakLength.innerText = breakTime;
    sessionLength.innerText = sessionTime;
    beep.pause();
    beep.currentTime = 0;
});


breakDecrementButton.addEventListener("click", () => {
    if (breakTime > 1) {
        breakTime--;
        breakLength.innerText = breakTime;
    }
});

breakIncrementButton.addEventListener("click", () => {
    if (breakTime < 60) {
        breakTime++;
        breakLength.innerText = breakTime;
    }
});

sessionIncrementButton.addEventListener("click", () => {
    if (sessionTime < 60) {
        sessionTime++;
        sessionLength.innerText = sessionTime;
        if (timerStatus === "stopped") {
            timeLeft.innerText = formatTime(sessionTime);
        }
    }
});

sessionDecrementButton.addEventListener("click", () => {
    if (sessionTime > 1) {
        sessionTime--;
        sessionLength.innerText = sessionTime;
        if (timerStatus === "stopped") {
            timeLeft.innerText = formatTime(sessionTime);
        }
    }
});

function startTimer() {
    timer = setInterval(() => {
        let [minutes, seconds] = timeLeft.innerText.split(":").map(Number);
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            beep.play();
            setTimeout(switchModes, 1000);
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            timeLeft.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
    }, 1000);
}

function switchModes() {
    isSession = !isSession;
    timerLabel.innerText = isSession ? "Session" : "Break";
    timeLeft.innerText = formatTime(isSession ? sessionTime : breakTime);
    startTimer();
}

function formatTime(minutes) {
    return `${String(minutes).padStart(2, '0')}:00`;
}

function playBeep(){
    audio.currentTime = 0;
    audio.play().catch((error) => console.log("Audio played failed:", error));
}

if (minutes === 0 && seconds === 0){
    playBeep();
}