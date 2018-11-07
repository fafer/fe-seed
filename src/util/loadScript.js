function loadScript(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var done = false;
  script.async = true;
  script.type = 'text/javascript';
  script.src = url;
  script.onload = script.onreadystatechange = function() {
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
