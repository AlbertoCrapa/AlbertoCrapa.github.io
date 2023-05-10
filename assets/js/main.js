const _app = { };

_app.startUp = () => {
    _app.openEye = document.querySelector("#openEye");
    blinkAnim();
    window.setInterval(blinkAnim, 4000);
};

const blinkAnim = () => {
  openEye.style.visibility = "hidden";
  const timeout = setTimeout(resetBlinkAnim, 80)
};
const resetBlinkAnim = () => {
    openEye.style.visibility = "visible";
};

  



_app.startUp();