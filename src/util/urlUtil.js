let urlUtil = function(url) {
  if (typeof url === 'undefined') url = window.location.href;
  var default_url = url,
    index = url.indexOf('?'),
    uri = url,
    search = '';

  if (index != -1) {
    search = url.substr(index + 1);
    uri = uri.substr(0, index);
  }

  function getParams(searchs) {
    if (!searchs) return {};
    var params = {},
      _searchs = searchs.split('&');
    for (var index = 0; index < _searchs.length; index++) {
      var temps = _searchs[index].split('=');
      params[temps[0]] = temps[1];
    }
    return params;
  }

  function serializeParams(param) {
    var params = '?';
    for (var name in param) {
      if (param.hasOwnProperty(name)) {
        if (typeof param[name] !== 'undefined')
          params += name + '=' + param[name] + '&';
        else params += name + '&';
      }
    }
    if (params === '?') return '';
    params = params.substr(0, params.length - 1);
    return params;
  }

  return {
    __params: getParams(search),
    removeParam: function(name) {
      delete this.__params[name];
      return this.getUrl();
    },
    setParam: function(name, value) {
      this.__params[name] = value;
      return this.getUrl();
    },
    getParam: function getParam(name) {
      return this.__params[name];
    },
    hasParam: function(name) {
      if (this.__params.hasOwnProperty(name)) return true;
      return false;
    },
    getDefaultUrl: function() {
      return default_url;
    },
    getUrl: function() {
      return uri + serializeParams(this.__params);
    }
  };
};

export default urlUtil;
