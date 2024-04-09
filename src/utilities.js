// Define variables for the cursor timeout and visibility
let cursorInactivityTimer;
const cursorInactivityThreshold = 1000;
// Function to hide the cursor
function hideCursor() {
    gameBoard.style.cursor = 'none';
}

// Function to reset the cursor visibility timer
function resetCursorTimer() {
    clearTimeout(cursorInactivityTimer);
    gameBoard.style.cursor = ''; 
    cursorInactivityTimer = setTimeout(hideCursor, cursorInactivityThreshold);
}

gameBoard.addEventListener('mousemove', resetCursorTimer);

resetCursorTimer();