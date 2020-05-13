let urlUtil = function(url) {
  if (typeof url === 'undefined') url = window.location.href;
  var default_url = url,
    index = url.indexOf('?'),
    hashIndex = url.indexOf('#'),
    uri = url,
    path = '',
    search = '',
    hash = '';

  if (index != -1) {
    if (hashIndex != -1) {
      search = url.substring(index + 1, hashIndex);
    } else {
      search = url.substring(index + 1);
    }
    uri = uri.substring(0, index);
  } else {
    if (hashIndex != -1) {
      uri = uri.substring(0, hashIndex);
    }
  }

  path = uri.replace(/^((https?:)?(\/\/)[^\/]*)/, '');

  if (hashIndex != -1) {
    hash = url.substring(hashIndex + 1);
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
      return uri + serializeParams(this.__params) + (hash ? '#' + hash : '');
    },
    path,
    uri
  };
};

export default urlUtil;
