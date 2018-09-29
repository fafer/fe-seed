(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var dpr = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
            dpr = 2
        } else {
            dpr = 1
        }
    } else {
        dpr = 1
    }
    docEl.setAttribute("data-dpr", dpr);
    if (doc.readyState === "complete") {
        doc.body.style.fontSize = 12 + "px"
    } else {
        doc.addEventListener("DOMContentLoaded", function() {
            doc.body.style.fontSize = 12 + "px"
        }, false)
    }
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if(width > 414) width = 414;
        var rem = width / 7.5;
        docEl.style.fontSize = rem + "px";
        flexible.rem = win.rem = rem
    }
    var evt = "onorientationchange"in window ? "orientationchange" : "resize";
    win.addEventListener(evt, function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300)
    }, false);
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300)
        }
    }, false);
    refreshRem();
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === "string" && d.match(/rem$/)) {
            val += "px"
        }
        return val
    }
    ;
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === "string" && d.match(/px$/)) {
            val += "rem"
        }
        return val
    }
})(window, window["lib"] || (window["lib"] = {}));