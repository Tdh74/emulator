let emulator;
let saveData = null;

Module.onRuntimeInitialized = () => {
  emulator = new Module.mGBAEmulator({
    canvas: document.getElementById("screen")
  });
};

// Load ROM
document.getElementById("rom").addEventListener("change", async (e) => {
  const rom = new Uint8Array(await e.target.files[0].arrayBuffer());
  emulator.loadROM(rom);
  emulator.run();
});

// Keyboard mapping
const keyMap = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  z: "A",
  x: "B",
  Enter: "START",
  Shift: "SELECT"
};

document.addEventListener("keydown", (e) => {
  if (keyMap[e.key]) emulator.keyDown(keyMap[e.key]);
});

document.addEventListener("keyup", (e) => {
  if (keyMap[e.key]) emulator.keyUp(keyMap[e.key]);
});

// On-screen buttons
document.querySelectorAll("[data-key]").forEach(btn => {
  btn.addEventListener("mousedown", () => emulator.keyDown(btn.dataset.key));
  btn.addEventListener("mouseup", () => emulator.keyUp(btn.dataset.key));
  btn.addEventListener("touchstart", () => emulator.keyDown(btn.dataset.key));
  btn.addEventListener("touchend", () => emulator.keyUp(btn.dataset.key));
});

// Save state
function saveState() {
  saveData = emulator.saveState();
  alert("State saved!");
}

// Load state
function loadState() {
  if (!saveData) {
    alert("No save found");
    return;
  }
  emulator.loadState(saveData);
}

