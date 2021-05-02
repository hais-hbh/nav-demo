// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"main.js":[function(require,module,exports) {
var $searchLi = $('.typeList > li');
var $form = $('.searchForm');
var $input = $('input');
var $siteList = $('.siteList');
var $last = $siteList.find('li.last');
var x = localStorage.getItem('hashMap');
var xObject = JSON.parse(x);
console.log(xObject);
var searchList = [{ name: 'baidu', action: 'https://www.baidu.com/s', word: 'wd' }, { name: 'bing', action: 'https://cn.bing.com/search', word: 'q' }, { name: 'google', action: 'https://www.google.com/search', word: 'q' }];
// $('.baidu').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://www.baidu.com/s')
//   $input.attr('name', 'wd')
// })
// $('.google').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://www.google.com/search')
//   $input.attr('name', 'q')
// })
// $('.bing').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://cn.bing.com/search')
//   $input.attr('name', 'q')
// })

var hashMap = xObject || [{ logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'Q', url: 'https://www.qq.com' }, { logo: 'B', url: 'https://www.bilibili.com' }];
$searchLi.click(function () {
  var index = $(this).index();
  $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose');
  $form.attr('action', searchList[index].action);
  $input.attr('name', searchList[index].word);
});

var simplifuUrl = function simplifuUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace('.com', '').replace('.cn', '').replace(/\/.*/, '');
};
$('.add').on('click', function () {
  var url = window.prompt('请输入网址');
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }
  hashMap.push({ logo: simplifuUrl(url).toUpperCase()[0], url: url });
  console.log(hashMap);
  render();
});
var compare = function compare(prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
};

var render = function render() {
  hashMap.sort(compare('logo'));
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    console.log(hashMap);

    var $li = $('\n <li>\n  <div class="site">\n    <div class="logo">' + node.logo + '</div>\n    <div class="link">' + simplifuUrl(node.url) + '</div>\n    <div class="close"><svg class="icon">\n      <use xlink:href="#icon-close"></use>\n    </svg></div>\n  </div>\n</li >\n').insertBefore($last);

    $li.find('.site').on('click', function () {
      window.open(node.url, '_self');
    });
    $li.find('.close').on('click', function (e) {
      if (window.confirm('确认要删除？')) {
        hashMap.splice(index, 1);
      }
      e.stopPropagation();
      render();
    });
  });
};
render();
$siteList.bind("contextmenu", function () {
  return false;
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  console.log(string);
  localStorage.setItem('hashMap', string);
};
// $(document).on('keypress', (e) => {
//   const key = e.key
//   for (let i = 0; i < hashMap.length; i++) {
//     console.log(hashMap[i].logo.toLowerCase())
//     if (hashMap[i].logo.toLowerCase() === key) {
//       window.open(hashMap[i].url)
//     }
//   }
// })
},{}],"C:\\Users\\rookie\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53982' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\rookie\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.c2042ae8.map