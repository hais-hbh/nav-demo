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
})({"epB2":[function(require,module,exports) {
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
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9e13a4fe.map