/**
 * requestAnimationFrame
 * @author fafer 2018年7月31日11:00:25
 */

'use strict';

let lastTime = 0;
let vendors = ['webkit', 'moz'];
let requestAnimationFrame, cancelAnimationFrame;
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  cancelAnimationFrame =
    window[vendors[x] + 'CancelAnimationFrame'] ||
    window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!requestAnimationFrame) {
  requestAnimationFrame = function (callback) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
    let id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

let animateScrollTop = ({ el = window, top, time, fn }) => {
  if (time <= 0) {
    el.scrollTo ? el.scrollTo(0, top) : (el.scrollTop = top);
    if (fn) fn();
    return;
  }
  let current;
  if (el === window) current = window.scrollTop || window.pageYOffset;
  else current = el.scrollTop;
  let dy = top - current;

  let speed = (1000 * dy) / (60 * time);

  function step() {
    current += speed;
    if ((current >= top && speed >= 0) || (current <= top && speed <= 0)) {
      el.scrollTo ? el.scrollTo(0, top) : (el.scrollTop = top);
      if (fn) fn();
    } else {
      el.scrollTo ? el.scrollTo(0, current) : (el.scrollTop = current);
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
};

export { requestAnimationFrame, cancelAnimationFrame, animateScrollTop };
