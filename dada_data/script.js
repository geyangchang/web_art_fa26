// ---------- to-do tasks ----------

// tasks that push in above my original task, in this order
let distractions = [
    "text my friend back",
    "reply to the group chat",
    "check Hinge",
    "scroll RedNote for a minute",
    "check what's due on Canvas"
];


// ---------- grab elements from the HTML ----------

let spawnButton = document.querySelector("#spawn-button");
let clearButton = document.querySelector("#clear-button");
let windowLayer = document.querySelector("#window-layer");
let todoList = document.querySelector("#todo-list");

// counts windows, so every 5th one adds a task
let windowCount = 0;

// which distraction comes next (0 = the first one in the list)
let taskNumber = 0;


// ---------- open a window ----------

function openWindow() {
    // make a new, empty div for the window
    let popup = document.createElement("div");
    popup.classList.add("popup");

    // put it in a random spot on the screen
    // window.innerWidth/innerHeight = the size of the browser window
    // subtracting the window's size (260 x 160 in the CSS) keeps it fully on screen
    popup.style.left = Math.random() * (window.innerWidth - 260) + "px";
    popup.style.top = Math.random() * (window.innerHeight - 160) + "px";

    // add the window to the page
    windowLayer.appendChild(popup);

    // every 5th window adds a task
    windowCount = windowCount + 1;
    console.log("window count:", windowCount);
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

    // prepend = add to the TOP of the list, pushing my original task down
    todoList.prepend(task);
    console.log("new task:", task.textContent);

    // move on to the next distraction; after the last one, start over
    taskNumber = taskNumber + 1;
    if (taskNumber == distractions.length) {
        taskNumber = 0;
    }
}


// ---------- buttons ----------

// onclick = the code that runs when the button is clicked
spawnButton.onclick = function () {
    openWindow();
};

clearButton.onclick = function () {
    windowLayer.innerHTML = "";   // empties the layer, removing every window
    console.log("cleared all windows");
};
