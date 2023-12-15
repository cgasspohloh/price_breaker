// Function to set a countdown timer
export function setTimer(timeDifference) {
    let remainingTime = timeDifference;
    const timerElement = document.getElementById('timerCount');
  
    const timerInterval = setInterval(function () {
      const seconds = Math.floor(remainingTime / 1000);
  
      // Update the timer span content
      timerElement.textContent = `${formatTime(seconds)}`;
  
      remainingTime -= 1000;
  
      if (remainingTime < 0) {
        clearInterval(timerInterval);
      }

    }, 1000);
  }
  
  // Helper function to format time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}