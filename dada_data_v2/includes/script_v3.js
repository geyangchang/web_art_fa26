// ---------- where interruptions come from ----------

// each pop-up shows one of these, in this order
// name = the title bar text, image = the picture inside the pop-up
// type = "internal" (I distracted myself) or "external" (something else pulled me away)
let apps = [
    { name: "Arc", image: "images/arc.png", type: "internal" },
    { name: "Instagram", image: "images/instagram.png", type: "internal" },
    { name: "Slack", image: "images/slack.png", type: "external" },
    { name: "RedNote", image: "images/rednote-2.webp", type: "internal" },
    { name: "Instagram", image: "images/instagram-2.png", type: "internal" },
    { name: "RedNote", image: "images/rednote.png", type: "internal" },
    { name: "Canvas", image: "images/canvas.png", type: "internal" },
    { name: "iMessage", image: "images/imessage-2.png", type: "external" },
    { name: "Instagram", image: "images/instagram-3.png", type: "internal" },
    { name: "Spotify", image: "images/spotify.png", type: "internal" },
    { name: "RedNote", image: "images/rednote-3.webp", type: "internal" },
    { name: "Arc", image: "images/arc-2.png", type: "internal" },
    { name: "Google Calendar", image: "images/google-calendar.png", type: "external" },
    { name: "Slack", image: "images/slack-2.webp", type: "external" },
    { name: "Instagram", image: "images/instagram-4.png", type: "internal" },
    { name: "iMessage", image: "images/imessage.png", type: "external" },
    { name: "Canvas", image: "images/canvas-2.png", type: "internal" },
    { name: "RedNote", image: "images/rednote-4.webp", type: "internal" },
    { name: "Spotify", image: "images/spotify-2.png", type: "internal" },
    { name: "Instagram", image: "images/instagram-5.png", type: "internal" }
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
    popup.classList.add(app.type);   // "internal" or "external" sets the title bar color

    // title bar with the app the interruption is from
    let titleBar = document.createElement("div");
    titleBar.classList.add("title-bar");
    titleBar.textContent = app.name;
    popup.appendChild(titleBar);

    // the × in the top right corner closes this pop-up
    let closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "×";
    closeButton.onclick = function () {
        // instead of removing the pop-up, turn it into a faint "ghost" left behind
        popup.classList.add("ghost");
        closeButton.remove();
    };
    popup.appendChild(closeButton);

    // the app's picture
    let image = document.createElement("img");
    image.classList.add("popup-image");
    image.src = app.image;      // src = which image file to show
    image.alt = app.name;       // alt = text shown if the image can't load
    popup.appendChild(image);

    // put it in a random spot on the screen
    popup.style.left = Math.random() * (window.innerWidth - 380) + "px";
    popup.style.top = Math.random() * (window.innerHeight - 250) + "px";

    // add the pop-up to the page
    windowLayer.appendChild(popup);

    // move on to the next app; after the last one, start over
    appNumber = appNumber + 1;
    if (appNumber == apps.length) {
        appNumber = 0;
    }

    // every 3rd pop-up adds a task
    windowCount = windowCount + 1;
    if (windowCount == 3) {
        addTask();
        windowCount = 0;   
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

function waitToOpen() {
    // (seconds x 1000 = milliseconds)
    setTimeout(function () {
        openWindow();

        // move on to the next gap; after the last one, start over
        gapNumber = gapNumber + 1;
        if (gapNumber == gaps.length) {
            gapNumber = 0;
        }
        waitToOpen();
    }, 
    gaps[gapNumber] * 1000);
}

// ---------- the opening screen ----------

let focusScreen = document.querySelector("#focus-screen");

// clicking anywhere hides the opening screen and starts the pop-ups
focusScreen.onclick = function () {
    focusScreen.remove();
    console.log("started");
    waitToOpen();   // start the first wait
};
