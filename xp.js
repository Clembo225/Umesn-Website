// Track password attempts
let attempts = 0;

function checkPassword() {
  const input = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");
  attempts++;

  // Password correct or 3rd attempt
  if (attempts <= 3 || input === "1234") {
  document.querySelector(".xp-box").style.display = "none";
  document.getElementById("error-msg").style.display = "none";

  showSuccessSequence(); // trigger full sequence
  return;
}

  if (attempts === 1) {
    errorMsg.textContent = "Gonz wilde falsches Passwort";
  } else if (attempts === 2) {
    errorMsg.textContent = "Na, wieda nix, tüe lei nouamol";
  }

  errorMsg.style.display = "block";

  // Shake animation
  const box = document.querySelector(".xp-box");
  box.classList.remove("shake");
  void box.offsetWidth; // trigger reflow
  box.classList.add("shake");
}

// Close button
function closeBox() {
  document.querySelector(".xp-box").style.display = "none";
}

// Draggable box (transform-based)
function dragElement(el) {
  let startX = 0, startY = 0;
  let currentX = 0, currentY = 0;
  const header = el.querySelector(".xp-titlebar");
  if(header) header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    currentX += dx;
    currentY += dy;
    el.style.setProperty('--drag-x', currentX + 'px');
    el.style.setProperty('--drag-y', currentY + 'px');
    startX = e.clientX;
    startY = e.clientY;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
dragElement(document.querySelector(".xp-box"));


// success sequence and tv shut-off
function showSuccessSequence() {
  const success = document.getElementById("success-msg");
  success.classList.add("show");

  // 1. Success message stays 2s
  setTimeout(() => {
    success.classList.remove("show");

    // 2. Show TV-off overlay
    let tvOff = document.createElement("div");
    tvOff.id = "tv-off";
    document.body.appendChild(tvOff);

    // Fade in overlay
    requestAnimationFrame(() => {
      tvOff.style.opacity = 1;
    });

    // 3. Wait 1.5s (overlay fully on)
    setTimeout(() => {
      // Remove XP box and noise canvas
      const xpBox = document.querySelector(".xp-box");
      if (xpBox) xpBox.remove();
      const canvas = document.getElementById("noise");
      canvas.style.display = "none";
      success.remove();

      // 4. Fade out TV-off overlay
      tvOff.style.opacity = 0;

      // 5. After overlay fades out, remove overlay and show video
      setTimeout(() => {
        tvOff.remove();
        revealVideo();
      }, 1000); // match CSS transition duration
    }, 1500);
  }, 2000);
}

function revealVideo() {
  const wrapper = document.getElementById("video-wrapper");
  const video = document.getElementById("trailer-video");

  // Show wrapper
  wrapper.classList.add("show");

  // Autoplay video (muted so it works on mobile)
  video.muted = true;
  video.play().catch(() => {}); // avoid errors if autoplay is blocked
}
