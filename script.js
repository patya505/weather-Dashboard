function opencards() {
    let allElem = document.querySelectorAll('.elem');
    let fullelme = document.querySelectorAll('.fullelem')
    let fullelmeback = document.querySelectorAll('.back')
    allElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullelme[elem.id].style.display = 'block'
        })
    })
    fullelmeback.forEach(function (back) {
        back.addEventListener('click', function () {
            fullelme[back.id].style.display = 'none'
        })


    })
}
opencards();

function todolist() {

    let form = document.querySelector('.addTask form')
    let taskinput = document.querySelector('.addTask form input')
    let takedetails = document.querySelector('.addTask form textarea')
    let taskcheckbox = document.querySelector('#check')
    let addTask = document.querySelector(' .addTask')


    var currenttask = []
    let storedTask = JSON.parse(localStorage.getItem('currenttask'))

    if (Array.isArray(storedTask)) {
        currenttask = storedTask
    } else {
        currenttask = []
    }

    function renderTask() {

        let allTask = document.querySelector(' .allTask')

        let sum = ''

        currenttask.forEach(function (elem, idx) {

            sum = sum + ` <div class="task">
                    <h5>${elem.task}<span class="${elem.imp}">imp**</span></h5>
                    <button id="${idx}">Mark As Completed</button>
                </div>`

        })

        allTask.innerHTML = sum
        localStorage.setItem('currenttask', JSON.stringify(currenttask));
        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currenttask.splice(btn.id, 1)
                renderTask()


            })
        })
    }
    renderTask();

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        currenttask.push({ task: taskinput.value, details: takedetails.value, imp: taskcheckbox.checked })
        renderTask();

        taskinput.value = ''
        taskcheckbox.checked = false
        takedetails.value = ""

    })

}
todolist();

function dailyplanner() {
    let dayplanner = document.querySelector('.day-planner')

    let dayplanData = JSON.parse(localStorage.getItem('dayplanData')) || {}
    console.log(dayplanData);

    let hours = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00-${7 + idx}:00`)
    let daysum = ''
    hours.forEach(function (elem, idx) {
        let saveData = dayplanData[idx] || ''
        daysum = daysum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" placeholder="..." type="text" value=${saveData}   >
                </div>`

    })
    dayplanner.innerHTML = daysum;


    let dayinput = document.querySelectorAll('.day-planner input')

    dayinput.forEach(function (elem) {

        elem.addEventListener('input', function () {

            dayplanData[elem.id] = elem.value
            localStorage.setItem('dayplanData', JSON.stringify(dayplanData))
        })
    })
}
dailyplanner();

function Motivational() {
    let motivationQuot = document.querySelector('.motivatation-2 h2');
    let motivationAuthor = document.querySelector('.motivatation-3 h2');

    async function fetchQuote() {
        try {
            // cache busting
            let response = await fetch(
                'https://zenquotes.io/api/random?ts=' + Date.now(),
                { cache: "no-store" }
            );

            let data = await response.json();

            motivationQuot.innerText = data[0].q;
            motivationAuthor.innerText = "- " + data[0].a;

        } catch (error) {
            motivationQuot.innerText = "Stay focused. Stay consistent.";
            motivationAuthor.innerText = "- Motivation";
        }
    }

    fetchQuote();
}
Motivational();



function PomodoroTimmer(){
        let start = document.querySelector('.start-timmer');
let pause = document.querySelector('.pause-timmer');
let restart = document.querySelector('.reset-timmer');
let timmer = document.querySelector('.promo-timmer h1');
let sessionText = document.querySelector('.section11');

let interval = null;
let totalsecond = 25 * 60;
let isRunning = false;
let isBreak = false;

// update timer display
function updateTimer() {
    let minutes = Math.floor(totalsecond / 60);
    let seconds = totalsecond % 60;
    timmer.innerHTML =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function startTimmer() {
    if (isRunning) return;

    isRunning = true;
    interval = setInterval(() => {
        if (totalsecond > 0) {
            totalsecond--;
            updateTimer();
        } else {
            clearInterval(interval);
            isRunning = false;

           
            if (!isBreak) {
                totalsecond = 5 * 60;
                isBreak = true;
                sessionText.innerText = "Break";
                sessionText.style.Color='red'
                updateTimer();
            }
        }
    }, 1000);
}


function pauseTimmer() {
    clearInterval(interval);
    isRunning = false;
}


function resetTimmer() {
    clearInterval(interval);
    totalsecond = 25 * 60;
    isBreak = false;
    isRunning = false;
    sessionText.innerText = "Work Session";
    updateTimer();
}

start.addEventListener('click', startTimmer);
pause.addEventListener('click', pauseTimmer);
restart.addEventListener('click', resetTimmer);


updateTimer();

}
PomodoroTimmer();

