var car = document.getElementById("car");
var alertBox = document.getElementById("alertBox");
var lights = {
  red: document.querySelector(".light.red"),
  yellow: document.querySelector(".light.yellow"),
  green: document.querySelector(".light.green")
};

var moving = false;
var carPosition = 10; // left in %
var currentLight = "green"; // start with green light

document.getElementById("raceBtn").addEventListener("click", function() {
  moving = true;
});

document.getElementById("brakeBtn").addEventListener("click", function() {
  moving = false;
});

function moveCar() {
  if (moving) {
    carPosition += 0.9; // speed
    car.style.left = carPosition + "%";

    if (currentLight === "red" && carPosition > 20) {
      showAlert(" You broke the signal! Pay $500 or face penalty!");
      moving = false;
    }

    if (carPosition > 100) carPosition = -20; // loop again
  }
  requestAnimationFrame(moveCar);
}

function showAlert(msg) {
  alertBox.innerText = msg;
  alertBox.style.display = "block";
  setTimeout(function() {
    alertBox.style.display = "none";
  }, 3000);
}

function cycleLights() {
  // Start with green (8 sec)
  setActiveLight("green");
  currentLight = "green";
  setTimeout(function() {
    // Yellow (3 sec)
    setActiveLight("yellow");
    currentLight = "yellow";
    setTimeout(function() {
      // Red (10 sec)
      setActiveLight("red");
      currentLight = "red";
      setTimeout(cycleLights, 4000);
    }, 3000);
  }, 5000);
}

function setActiveLight(color) {
  for (var key in lights) {
    lights[key].classList.remove("active");
    lights[key].style.background = "#444";
  }
  lights[color].classList.add("active");
  if (color === "red") lights[color].style.background = "red";
  if (color === "yellow") lights[color].style.background = "yellow";
  if (color === "green") lights[color].style.background = "green";
}

// Start game
cycleLights();
moveCar();
