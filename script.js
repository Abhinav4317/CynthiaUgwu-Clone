const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}
firstPageAnim();
/*jab mouse bahut tez move ho tab hum skew kar paaye aur max skew define kar paye*/
function circleSkew() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    xprev = dets.clientX;
    yprev = dets.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    circleMouseFollower(xscale, yscale);
  });
}
circleSkew();
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    this.document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale}) `;
  });
}
circleMouseFollower();
// teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-40, 40, diffrot),
    });
  });
});
