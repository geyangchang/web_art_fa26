

//////////////////////////////////////////////////////////////////////////////////////
// Demo Part 1: Shrinking the walking person and resizing tables on click (TOGGLE)
//////////////////////////////////////////////////////////////////////////////////////

// NOTE: walking-person has a transition applied in the CSS for smooth resizing when its width changes

let shrunkenGhostPerson = false;

document.getElementById("walking-person").onclick = function() {  
    
    if (!shrunkenGhostPerson) { // If the person is not shrunken, shrink him
            document.getElementById("walking-person").style.opacity = .33;
            document.getElementById("walking-person").style.width = "25px";

            // Increase size of all tables (all elements with the class "table")
            let tables = document.getElementsByClassName("table");
            for (let i = 0; i < tables.length; i++) {
                tables[i].style.width = "30%";
            }

            shrunkenGhostPerson = true;

    } else { // If the person is already shrunken, restore him to original size

            document.getElementById("walking-person").style.opacity = 1;
            document.getElementById("walking-person").style.width = "75px";
            
            // Reset tables (all elements with the class "table") to original width
            let tables = document.getElementsByClassName("table");
            for (let i = 0; i < tables.length; i++) {
                tables[i].style.width = "20%";
            }

            shrunkenGhostPerson = false;
    }
        
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Demo Part 2: Using Interval (only one click needed)
// Deactivate Part 1 (above) and activate the code below
/////////////////////////////////////////////////////////////////////////////////////////////////////

/* - remove this "/*" comment and the one at the bottom to activate Part 2

// Declare variables for the interval and increments
let myInterval;
let personIncrement = 0;
let chairIncrement = 0;

// Add click event listener to the walking person, which will call the resizeAnimation function 
// to trigger the shrinking and table resizing animation
document.getElementById("walking-person").addEventListener("click", resizeAnimation);

// Function to start the interval and handle the animation
// The commands wait inside the function until called by the click event
function resizeAnimation() {
    
    myInterval = setInterval(function() {
        
        // Increment the person's size reduction by 5 pixels each interval
        personIncrement += 5;

        // Apply the updated size to the walking person and make him semi-transparent
        document.getElementById("walking-person").style.opacity = .5;
        document.getElementById("walking-person").style.width = 75 - personIncrement + "px";
        
        // Increment the chair's size increase by 2% each interval
        chairIncrement += 2;
        
        // Apply the updated size to all tables
        let tables = document.getElementsByClassName("table");

        // Loop through each table and update its width based on the chairIncrement value
        for (let i = 0; i < tables.length; i++) {
            tables[i].style.width = 20 + chairIncrement + "%";
        }

        // Stop the interval once the person's size reduction reaches 25 pixels
        if (personIncrement >= 25) {
            clearInterval(myInterval);
        }

    }, 1000); // Interval set to 1000 milliseconds (1 second)

}

*/