// ---------- where interruptions come from ----------

// each pop-up shows one of these in its title bar, in this order
let apps = [
    "Arc",
    "Instagram",
    "Slack",
    "RedNote",
    "Canvas",
    "Spotify",
    "Google Calendar",
    "iMessage"
];

// which app comes next (0 = the first one in the list)
let appNumber = 0;


// ---------- to-do tasks ----------

// tasks that push in above the main task, in this order
let distractions = [
    "reply on Slack",
    "check Instagram",
    "scroll RedNote for a minute",
    "check what's due on Canvas",
    "make a new playlist",
    "check my calendar",
    "reply to friend's message"
];

// which distraction comes next
let taskNumber = 0;

// counts pop-ups, so every 5th one adds a task
let windowCount = 0;


// ---------- grab elements from the HTML ----------

let windowLayer = document.querySelector("#window-layer");
let todoList = document.querySelector("#todo-list");


// ---------- open a pop-up ----------

function openWindow() {
    // the app for this pop-up
    let app = apps[appNumber];

    // make a new div for the pop-up
    let popup = document.createElement("div");
    popup.classList.add("popup");

    // title bar with the app the interruption is from
    let titleBar = document.createElement("div");
    titleBar.classList.add("title-bar");
    titleBar.textContent = app;
    popup.appendChild(titleBar);

    // the × in the top right corner closes this pop-up
    let closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "×";
    closeButton.onclick = function () {
        popup.remove();
        console.log("closed:", app);
    };
    popup.appendChild(closeButton);

    // put it in a random spot on the screen
    // subtracting the pop-up's size (380 x 250 in the CSS) keeps it fully on screen
    popup.style.left = Math.random() * (window.innerWidth - 380) + "px";
    popup.style.top = Math.random() * (window.innerHeight - 250) + "px";

    // add the pop-up to the page
    windowLayer.appendChild(popup);

    // move on to the next app; after the last one, start over
    appNumber = appNumber + 1;
    if (appNumber == apps.length) {
        appNumber = 0;
    }

    // every 5th pop-up adds a task
    windowCount = windowCount + 1;
    if (windowCount == 5) {
        addTask();
        windowCount = 0;   // start counting again
    }
}


// ---------- add a task to the to-do list ----------

function addTask() {
    // make a new list item with the next distraction in order
    let task = document.createElement("li");
    task.textContent = distractions[taskNumber];

    // prepend = add to the TOP of the list, pushing the main task down
    todoList.prepend(task);
    console.log("new task:", task.textContent);

    // move on to the next distraction; after the last one, start over
    taskNumber = taskNumber + 1;
    if (taskNumber == distractions.length) {
        taskNumber = 0;
    }
}


// ---------- pop-ups open by themselves ----------

// seconds to wait before each pop-up, in order — from my data set
let gaps = [5, 1.3, 4.4, 1.3, 1.3, 1, 4.4];

// which gap comes next
let gapNumber = 0;

function waitThenOpen() {
    // setTimeout runs the code inside ONCE, after a wait in milliseconds
    // (seconds x 1000 = milliseconds)
    setTimeout(function () {
        openWindow();

        // move on to the next gap; after the last one, start over
        gapNumber = gapNumber + 1;
        if (gapNumber == gaps.length) {
            gapNumber = 0;
        }

        // start waiting for the next pop-up
        waitThenOpen();
    }, gaps[gapNumber] * 1000);
}

// start the first wait
waitThenOpen();
