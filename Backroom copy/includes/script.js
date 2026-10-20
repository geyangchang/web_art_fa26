let enlargedCat = "false";


document.getElementById("resting-cat").onclick = function() {
    if (enlargedCat === "false") {
        document.getElementById("resting-cat").style.transform = "scale(2)";
        document.getElementById("resting-cat").style.opacity = "0.5";
        enlargedCat = "true";
    } else {
        document.getElementById("resting-cat").style.transform = "scale(1)";
        document.getElementById("resting-cat").style.opacity = "1";
        enlargedCat = "false";
    }
}


//////////////////////////////////////////////////////////////////////////////////////
// Part 1: Shrinking the cat and enlarging the room items on click (TOGGLE)
//////////////////////////////////////////////////////////////////////////////////////

// NOTE: cat and .room-item have a transition applied in the CSS for smooth resizing

let shrunkenCat = false;

document.getElementById("cat").onclick = function() {

    if (!shrunkenCat) { // If the cat is not shrunken, shrink it
            document.getElementById("cat").style.opacity = .33;
            document.getElementById("cat").style.width = "25px";

            // Enlarge all the room items (all elements with the class "room-item")
            let items = document.getElementsByClassName("room-item");
            for (let i = 0; i < items.length; i++) {
                if (items[i].id !== "resting-cat") { // skip the resting cat, it has its own toggle
                    items[i].style.transform = "scale(1.5)";
                }
            }

            shrunkenCat = true;

    } else { // If the cat is already shrunken, restore it to original size

            document.getElementById("cat").style.opacity = 1;
            document.getElementById("cat").style.width = "75px";

            // Reset room items back to their original size
            let items = document.getElementsByClassName("room-item");
            for (let i = 0; i < items.length; i++) {
                if (items[i].id !== "resting-cat") {
                    items[i].style.transform = "";
                }
            }

            shrunkenCat = false;
    }

}
