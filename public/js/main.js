import { initDB } from "./db.js";
import { initMap } from "./map.js";

function startApp() {
  fetch("data.json")
    .then(res => res.json())
    .then(countries => {
      initMap(countries);
    });
}

initDB(startApp);
let scale = 1;
let pos = { x: 0, y: 0 };

let isDragging = false;
let start = { x: 0, y: 0 };

let pointers = [];
let lastDistance = 0;

const map = document.getElementById("map-inner");
const container = map.parentElement;



function clamp() {
  const rect = map.getBoundingClientRect();

  const maxX = 0;
  const maxY = 0;

  const minX = container.clientWidth - rect.width;
  const minY = container.clientHeight - rect.height;

  pos.x = Math.min(maxX, Math.max(minX, pos.x));
  pos.y = Math.min(maxY, Math.max(minY, pos.y));
}

function update() {
  clamp();
  map.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
}


map.addEventListener("wheel", (e) => {
  e.preventDefault();

  const rect = map.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const zoomFactor = 1 - e.deltaY * 0.001;

  let newScale = scale * zoomFactor;
  newScale = Math.min(Math.max(0.7, newScale), 4);

  const scaleChange = newScale / scale;

  pos.x = x - (x - pos.x) * scaleChange;
  pos.y = y - (y - pos.y) * scaleChange;

  scale = newScale;

  update();
});


map.addEventListener("pointerdown", (e) => {
  map.setPointerCapture(e.pointerId);
  pointers.push(e);

  if (pointers.length === 1) {
    isDragging = true;
    start.x = e.clientX - pos.x;
    start.y = e.clientY - pos.y;
  }
});


map.addEventListener("pointermove", (e) => {
  // update pointer
  for (let i = 0; i < pointers.length; i++) {
    if (pointers[i].pointerId === e.pointerId) {
      pointers[i] = e;
      break;
    }
  }


  if (pointers.length === 2) {
    isDragging = false;

    const p1 = pointers[0];
    const p2 = pointers[1];

    const dx = p1.clientX - p2.clientX;
    const dy = p1.clientY - p2.clientY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const rect = map.getBoundingClientRect();
    const midX = (p1.clientX + p2.clientX) / 2 - rect.left;
    const midY = (p1.clientY + p2.clientY) / 2 - rect.top;

    if (lastDistance) {
      const zoomFactor = distance / lastDistance;

      let newScale = scale * zoomFactor;
      newScale = Math.min(Math.max(0.7, newScale), 4);

      const scaleChange = newScale / scale;

      pos.x = midX - (midX - pos.x) * scaleChange;
      pos.y = midY - (midY - pos.y) * scaleChange;

      scale = newScale;

      update();
    }

    lastDistance = distance;
    return;
  }


  if (isDragging && pointers.length === 1) {
    pos.x = e.clientX - start.x;
    pos.y = e.clientY - start.y;

    update();
  }
});


map.addEventListener("pointerup", (e) => {
  map.releasePointerCapture(e.pointerId);

  pointers = pointers.filter(p => p.pointerId !== e.pointerId);

  if (pointers.length < 2) {
    lastDistance = 0;
  }

  if (pointers.length === 0) {
    isDragging = false;
  }
});

map.addEventListener("pointercancel", () => {
  pointers = [];
  lastDistance = 0;
  isDragging = false;
});