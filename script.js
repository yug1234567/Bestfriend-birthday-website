/* ======= PERSONALISE THESE ======= */
const FRIEND_NAME = "[HER_NAME]";
const YOUR_NAME   = "[YOUR_NAME]";
/* Put her birthday here in YYYY-MM-DD format (example: 2025-12-05) */
const BIRTHDAY_ISO = "2025-12-05";
/* ================================= */

document.getElementById("friendName").textContent = FRIEND_NAME;
document.getElementById("yourName").textContent = YOUR_NAME;
document.querySelectorAll(".inline-name").forEach(n => n.textContent = n.textContent.includes("[HER_NAME]") ? FRIEND_NAME : YOUR_NAME);

const countdownEl = document.getElementById("countdownTimer");
const surpriseBtn = document.getElementById("surpriseBtn");
const letterBtn = document.getElementById("letterBtn");
const song = document.getElementById("song");

function updateCountdown(){
  const now = new Date();
  // Next occurrence of the birthday this year or next
  const [y,m,d] = BIRTHDAY_ISO.split("-").map(Number);
  let target = new Date(now.getFullYear(), m-1, d, 0, 0, 0);
  if(target < now){ target = new Date(now.getFullYear()+1, m-1, d, 0, 0, 0); }

  const diff = target - now;
  if(diff <= 0){
    countdownEl.textContent = "It’s today — Happy Birthday! 🎂";
    return;
  }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* Confetti */
function launchConfetti(pieces = 150){
  const container = document.getElementById("confetti-container");
  const colors = ["#ff5fa2","#7a5cff","#ffd166","#06d6a0","#118ab2","#ef476f","#f78da7","#a29bfe"];
  const w = window.innerWidth;

  for(let i=0;i<pieces;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    const size = 6 + Math.random()*10;
    c.style.width = size + "px";
    c.style.height = (size * 1.4) + "px";
    c.style.left = Math.random()*w + "px";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    const xMove = (Math.random()*200 - 100) + "px"; // drift left/right
    c.style.setProperty("--x-move", xMove);
    c.style.animationDuration = (2.5 + Math.random()*2.5) + "s";
    c.style.animationDelay = (Math.random()*0.2) + "s";
    container.appendChild(c);
    // clean up after animation
    setTimeout(()=> c.remove(), 6000);
  }
}

/* Buttons */
surpriseBtn.addEventListener("click", async () => {
  launchConfetti();
  try {
    await song.play(); // will only work after a user click due to browser rules
  } catch(e){
    // If no song.mp3 provided or playback blocked
    console.log("Song not playing (no file or browser blocked).");
  }
});
letterBtn.addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
});