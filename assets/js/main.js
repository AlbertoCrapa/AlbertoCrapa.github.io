const _app = {};
_app.isBlinking = true;
_app.startUp = () => {
  _app.openEye = document.querySelector("#openEye");
  blinkAnim();
  _app.clickEffect();
  _app.mouseVelocityDetection();
  _app.shakeDetection();
  window.setInterval(blinkAnim, 4000);
};

const blinkAnim = () => {
  if (_app.isBlinking) {
    document.getElementById("openEye").src="/public/svg/albyeah_logo_blink.svg";
    const timeout = setTimeout(resetBlinkAnim, 80);
  }
};
const resetBlinkAnim = () => {
  document.getElementById("openEye").src="/public/svg/albyeah_logo_normal.svg";
};


_app.clickEffect = () => {
  let winPos;
  window.scrollTo(15, 15);
  let flag = false;
  document.querySelector("*").addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.classList[0] == "circle"){
     
      document.getElementById("openEye").src="/public/svg/albyeah_logo_hurt.svg";
    }

    let div = document.createElement("div");
    div.classList.add("click-effect-div");

    document.querySelector(".canvas").appendChild(div);
    div.style.left = e.clientX + "px";
    div.style.top = e.clientY + "px";
    let maxElems = 11; //16
    for (i = 0; i < maxElems; i++) {
      let span = document.createElement("span");
      span.classList.add("click-effect-span");
      let newSpan = div.appendChild(span);
      let deg = i * (360 / maxElems) + Math.floor(Math.random() * 15);
      let height = 20 + Math.floor(Math.random() * 30);
      let width = 4 + Math.floor(Math.random() * 10);
      newSpan.style.height = height + "px";
      newSpan.style.width = width + "px";
      newSpan.style.transform = "rotate(" + deg + "deg)";
    }
    window.requestAnimationFrame(function () {
      Array.from(div.querySelectorAll("span")).forEach((el) => {
        var trasY = -50 - Math.floor(Math.random() * 100);
        el.style.transform += "scaleY(0.5) translateY(" + trasY + "px)";
        el.style.opacity = "0";
      });
      window.setTimeout(function () {
        document.querySelector(".canvas").removeChild(div);
      }, 400);
    });
  });
};

_app.mouseVelocityDetection = () => {
    let prevEvent, currentEvent;
    document.documentElement.onmousemove = function (event) {
    currentEvent = event;
  };

  let prevSpeed = 0;
  let detecCounter = 0;
  setInterval(function () {
    if (prevEvent && currentEvent) {
      let movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
      let movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
      let movement = Math.sqrt(movementX * movementX + movementY * movementY);
      //speed=movement/100ms= movement/0.1s= 10*movement/s
      let speed = 10 * movement; //current speed
      // console.log(Math.round(speed));
      document.getElementById("speed").innerText = Math.round(speed);

      detecCounter++;
      if (speed == 0 ){
        setTimeout(() => {
          document.getElementById("state").innerText ="ok";
        }, 3000);
      }
      if (speed > 1000 && detecCounter == 25) {
        
        document.getElementById("state").innerText ="Dizzy";
      }
      if (detecCounter == 25) detecCounter = 0;
    }

    prevEvent = currentEvent;
    prevSpeed = speed;
  }, 100);
};

_app.shakeDetection = () => {
  let myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000, // optional, determines the frequency of event generation
  });
  myShakeEvent.start();
  window.addEventListener("shake", shakeEventDidOccur, false);

  //function to call when shake occurs
  function shakeEventDidOccur() {
    //put your own code here etc.
    alert("shake!");
    document.getElementById("state").innerText = "SHAKE";
  }
};

_app.resetSmileToDefault= () => {
  
}

_app.startUp();
