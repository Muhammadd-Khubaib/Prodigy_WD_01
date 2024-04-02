let stopwatch;
let startTime;
let isRunning = false;
let lapNumber = 1;

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('stopBtn').addEventListener('click', stopStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (stopwatch || 0);
        stopwatch = setInterval(updateTime, 10);
        document.getElementById('startBtn').innerText = 'Pause';
        document.getElementById('lapBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;
    } else {
        isRunning = false;
        clearInterval(stopwatch);
        document.getElementById('startBtn').innerText = 'Resume';
        document.getElementById('lapBtn').disabled = true;
    }
}

function stopStopwatch() {
    isRunning = false;
    clearInterval(stopwatch);
    document.getElementById('startBtn').innerText = 'Start';
    document.getElementById('lapBtn').disabled = true;
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatch);
    document.getElementById('startBtn').innerText = 'Start';
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('lapList').innerHTML = '';
    lapNumber = 1;
}

function recordLap() {
    const lapTime = document.getElementById('display').innerText;
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapNumber}: ${lapTime}`;
    document.getElementById('lapList').appendChild(lapItem);
    lapNumber++;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    const hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (elapsedTime.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    document.getElementById('display').innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
