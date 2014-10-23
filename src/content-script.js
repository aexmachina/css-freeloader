chrome.runtime.onMessage.addListener(function onMessage(request, sender, sendResponse) {
  console.log('css-freeloader', request);
  switch (request.command) {
    case 'reloadCss':
      reloadCss();
      break;
  }
});

function reloadCss() {
  var stylesheets = document.querySelectorAll('link[rel=stylesheet]');
  var time = Date.now();
  var param = 'css-freeloader';
  var regExp = new RegExp(param + '=\\d+');
  var noCache = param + '=' + time;

  for (var i = 0; i < stylesheets.length; i++) {
    var link = stylesheets[i];
    if (!link.href.match(regExp)) {
      var joiner = link.href.indexOf('?') == -1 ? '?' : '&';
      link.href += joiner + noCache;
    }
    else {
      link.href = link.href.replace(regExp, noCache);
    }
  }
}
