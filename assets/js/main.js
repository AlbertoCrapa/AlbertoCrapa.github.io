const _app = {};
_app.isBlinking = true;
_app.smileIsAngry = false;
_app.checkIfEyeDizzy = false;
_app.smileAngryCounter = 0;
_app.checkIfEyeHurt = false;


_app.startUp = () => {
  _app.eye = document.querySelector("#openEye");
  _app.face = document.querySelector(".smile_logo");
  
  _app.blinkAnim();
  _app.clickEffect();
  _app.mouseVelocityDetection();
  _app.shakePhoneDetection();
  window.setInterval(_app.blinkAnim, 4000);
};
_app.blinkAnim = () => {
  if (_app.isBlinking) {
    // console.log("Blink Started");
    _app.setSmileState("blink");
    setTimeout(_app.resetBlinkAnim, 80);
  }
};
_app.resetBlinkAnim = () => {
  if (_app.smileIsAngry){
    // _app.setSmileState("angry");
  }
  else _app.setSmileState("normal");
  
};
_app.mouseVelocityDetection = () => {
    let prevEvent, currentEvent;
    document.documentElement.onmousemove = function (event) {
    currentEvent = event;
  };

  let prevSpeed = 0;
  let detecCounter = 0;
  let mouseSpeed = 0;
  setInterval(function () {
    
    if (prevEvent && currentEvent) {
      let movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
      let movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
      let movement = Math.sqrt(movementX * movementX + movementY * movementY);
      //speed=movement/100ms= movement/0.1s= 10*movement/s
      mouseSpeed = 10 * movement; //current speed
      // console.log(Math.round(speed));
      // console.log(detecCounter);
      if (mouseSpeed == 0 ){
        
        setTimeout(() => {
          //ok
        }, 3000);
      }
      
      if (mouseSpeed > 1000 && detecCounter == 15) {
        
        _app.setSmileDizzy();
      }
      if (mouseSpeed > 500){
        detecCounter++;
      }
      else detecCounter = 0;
    }

    prevEvent = currentEvent;
    prevSpeed = mouseSpeed;
  }, 100);
};
_app.shakePhoneDetection = () => {
  let myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000, // optional, determines the frequency of event generation
  });
  myShakeEvent.start();
  window.addEventListener("shake", shakeEventDidOccur, false);
  //function to call when shake occurs
  function shakeEventDidOccur() {
    _app.setSmileDizzy();
  }
};
_app.setSmileState= (state_name) => {
  _app.eye.src=`/public/svg/albyeah_logo_${state_name}.svg`;
};
_app.setSmileDizzy = () =>{
  if (_app.checkIfEyeDizzy == false){
    _app.checkIfEyeDizzy = true;
    _app.isBlinking = false;
    _app.setSmileState("dizzy");
    setTimeout(() => {
      console.log("finish dizzy");
      _app.resetBlinkAnim();
      _app.isBlinking = true;
      _app.checkIfEyeDizzy = false;
    }, 2_000);
  }
};
_app.handleSmileClick = () =>{
  
  _app.setSmileState("hurt");
  _app.smileAngryCounter++;
  // console.log(_app.smileAngryCounter);
  
  if (_app.checkIfEyeHurt == false ){
    
    _app.checkIfEyeHurt = true;
    _app.isBlinking = false;
    setTimeout(() => {
      _app.resetBlinkAnim();
      _app.isBlinking = true;
      _app.checkIfEyeHurt = false;

    },1000);
  }
};




_app.clickEffect = () => {
  let winPos;
  window.scrollTo(15, 15);
  let flag = false;

  document.querySelector("*").addEventListener("click", function (e) {
    // console.log(e.target);
    // console.log("DWDDA");
    let div = document.createElement("div");
    div.classList.add("click-effect-div");

    document.querySelector(".canvas").appendChild(div);
    div.style.left = e.clientX + "px";
    div.style.top = e.clientY + "px";
    let maxElems = 9; //16
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

    if (e.target.classList[0] == "circle" && !_app.checkIfEyeDizzy){
      _app.handleSmileClick();
      // 
    }
  });
};
_app.startUp();
