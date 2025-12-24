// Track password attempts
let attempts = 0;

function checkPassword() {
  const input = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");
  attempts++;

  // Password correct or 3rd attempt
  if (attempts >= 3 || input === "1234") {
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

  // After 2 seconds, fade out success
  setTimeout(() => {
    success.classList.remove("show");

    // Wait for logo animation to finish (1s) before TV-off
    setTimeout(() => {
      // Create black overlay (TV-off)
      let tvOff = document.createElement("div");
      tvOff.id = "tv-off";
      document.body.appendChild(tvOff);

      setTimeout(() => {
        tvOff.style.opacity = 1;
      }, 50);

      // After TV-off completes, show YouTube video
      setTimeout(() => {
        const xpBox = document.querySelector(".xp-box");
        if(xpBox) xpBox.remove();
        success.remove();

        // const videoContainer = document.getElementById("video-container");
        // videoContainer.style.display = "block";
        //videoContainer.innerHTML = `
          //<iframe width="560" height="315" src="https://www.youtube.com/embed/LLXeXwJX8UA?si=vZK6hB-toHfZOu1G" title="YouTube video player" frameborder="0" allow="accelerometer;
           //autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        //`;
        const message = document.getElementById("message-container");
        message.classList.add("show");

        // start snow
        startSnow();
      }, 1500); // TV-off duration
    }, 1000); // logo fall duration
  }, 2000); // success message display duration
}


// ❄️ Natural, continuous snowfall (no burst)
function startSnow() {
  spawnSnowflake(); // start the loop
}

function spawnSnowflake() {
  const snowLayer = document.getElementById("snow-layer");
  if (!snowLayer) return;

  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = ["❄", "❅", "❆"][Math.floor(Math.random() * 3)];

  // Large flakes
  const size = Math.random() * 30 + 30; // 30–60px
  snowflake.style.fontSize = size + "px";

  // Random horizontal position (even slightly off-screen)
  snowflake.style.left = Math.random() * 110 - 5 + "vw";

  // Random speed
  const duration = Math.random() * 10 + 10; // 10–20s
  snowflake.style.animationDuration = duration + "s";

  // Random sideways drift
  const drift = Math.random() * 160 - 80;
  snowflake.style.setProperty("--drift", drift + "px");

  snowLayer.appendChild(snowflake);

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
  });

  // Random delay before next snowflake
  const nextDelay = Math.random() * 300 + 120; // 0.3–0.9s
  setTimeout(spawnSnowflake, nextDelay);
}


