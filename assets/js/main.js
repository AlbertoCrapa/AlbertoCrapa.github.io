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


let winPos;
window.scrollTo(15,15);
let flag = false;
document.querySelector("*").addEventListener("click", function (e) {

  var div = document.createElement("div");
  div.classList.add("click-effect-div");

  document.querySelector(".canvas").appendChild(div);
  div.style.left = e.clientX + "px";
  div.style.top = e.clientY + "px";
  let maxElems = 16;
  for (i = 0; i < maxElems; i++) {
    let span = document.createElement("span");
    span.classList.add("click-effect-span");
    let newSpan = div.appendChild(span);
    let deg = i * (360 / maxElems) + Math.floor(Math.random() * 15);
    let height = 20 + Math.floor(Math.random()*30);
    let width = 4 + Math.floor(Math.random()*10);
    newSpan.style.height = height + "px";
    newSpan.style.width = width + "px";
    newSpan.style.transform = "rotate(" + deg + "deg)";
  }
  window.requestAnimationFrame(
    function () {
      Array.from(div.querySelectorAll("span")).forEach((el) => {
        var trasY = -50 - Math.floor(Math.random()*100) ;
        el.style.transform += "scaleY(0.5) translateY(" + trasY + "px)";
        el.style.opacity = "0";
      });
      window.setTimeout(function(){
        document.querySelector(".canvas").removeChild(div);
      }, 400)
    }
    
  );
  
  
    
});



_app.startUp();