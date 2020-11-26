function loadScript(url, callback) {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  let done = false;
  script.async = true;
  script.type = 'text/javascript';
  script.src = url;
  script.onload = script.onreadystatechange = function () {
    if (
      !done &&
      (!this.readyState || /loaded|complete/.test(script.readyState))
    ) {
      done = true;
      if (typeof callback === 'function') {
        callback();
      }
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
      head = script = null;
    }
  };
  head.appendChild(script);
}

module.exports = loadScript;
