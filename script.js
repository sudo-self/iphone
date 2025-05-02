function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("currentTime");
  const dateElement = document.getElementById("currentDate");

  // Format time (HH:MM)
  let hours = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  timeElement.textContent = `${hours}:${minutes}`;

  // Format date (Weekday, Month Day)
  const options = { weekday: "long", month: "long", day: "numeric" };
  dateElement.textContent = now.toLocaleDateString("en-US", options);
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Screen state
let isLocked = true;

// Toggle screen lock
function toggleScreen() {
  const lockScreen = document.getElementById("lockScreen");
  const homeScreen = document.getElementById("homeScreen");

  isLocked = !isLocked;

  if (isLocked) {
    // Lock the screen
    lockScreen.style.display = "flex";
    homeScreen.style.display = "none";

    // Change unlock button icon
    document.getElementById("unlockBtn").innerHTML =
      '<i class="fas fa-lock-open text-xl"></i>';

    // Add animation
    homeScreen.classList.add("slide-down");
    setTimeout(() => {
      homeScreen.classList.remove("slide-down");
    }, 500);
  } else {
    // Unlock the screen
    lockScreen.style.display = "none";
    homeScreen.style.display = "block";

    // Change unlock button icon
    document.getElementById("unlockBtn").innerHTML =
      '<i class="fas fa-lock text-xl"></i>';

    // Add animation
    homeScreen.classList.add("slide-up");
    setTimeout(() => {
      homeScreen.classList.remove("slide-up");
    }, 500);
  }
}

// Event listeners
document.getElementById("powerBtn").addEventListener("click", toggleScreen);
document.getElementById("unlockBtn").addEventListener("click", toggleScreen);

// Simulate swipe up to unlock
let startY;
const lockScreen = document.getElementById("lockScreen");

lockScreen.addEventListener(
  "touchstart",
  (e) => {
    startY = e.touches[0].clientY;
  },
  { passive: true }
);

lockScreen.addEventListener(
  "touchmove",
  (e) => {
    if (!startY) return;

    const y = e.touches[0].clientY;
    const diff = startY - y;

    if (diff > 50) {
      // Swipe up detected
      toggleScreen();
      startY = null;
    }
  },
  { passive: true }
);