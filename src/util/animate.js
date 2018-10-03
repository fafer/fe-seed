'use strict'

let lastTime = 0
let vendors = ['webkit', 'moz']
let requestAnimationFrame, cancelAnimationFrame
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
  cancelAnimationFrame =
    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!requestAnimationFrame)
  requestAnimationFrame = function (callback, element) {
    let currTime = new Date().getTime()
    let timeToCall = Math.max(0, 16 - (currTime - lastTime))
    let id = window.setTimeout(function () { callback(currTime + timeToCall) },
      timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

if (!cancelAnimationFrame)
  cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }

let animateScrollTop = (top, time, fn) => {
  if(time <= 0) {
    window.scrollTo(0, top)
    if (fn) fn()
    return
  }
  let current = window.scrollTop || window.pageYOffset, dy = top - current,
    speed = (1000 * dy) / (60 * time)
  function step(timestamp) {
    current += speed
    if ((current >= top && speed >= 0) || (current <= top && speed <= 0)) {
      window.scrollTo(0, top)
      if (fn) fn()
    } else {
      window.scrollTo(0, current)
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

export {
  requestAnimationFrame,
  cancelAnimationFrame,
  animateScrollTop
}