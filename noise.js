const canvas = document.getElementById("noise");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function drawNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = imageData.data;

  for (let i = 0; i < buffer.length; i += 4) {
    const value = Math.random() > 0.5 ? 255 : 0;
    buffer[i] = value;     // R
    buffer[i + 1] = value; // G
    buffer[i + 2] = value; // B
    buffer[i + 3] = 255;   // Alpha
  }

  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(drawNoise);
}

drawNoise();
