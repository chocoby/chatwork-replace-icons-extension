//@ sourceMappingURL=contentscript.map
(function() {
  var handleDOM, iconList, replaceIcon, timer, xpathExp;

  xpathExp = "";

  iconList = {};

  timer = 0;

  handleDOM = function() {
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      var i, xpath, xpathLength;

      xpath = document.evaluate(xpathExp, document, null, 7, null);
      xpathLength = xpath.snapshotLength;
      i = 0;
      while (i < xpathLength) {
        replaceIcon(xpath.snapshotItem(i));
        i += 1;
      }
      return timer = 0;
    }, 5);
    return null;
  };

  replaceIcon = function(icon) {
    var classNameMatch, iconClass;

    classNameMatch = icon.className.match(/cw_a[0-9]+/);
    if (!classNameMatch) {
      return;
    }
    iconClass = classNameMatch[0];
    if (iconList[iconClass]) {
      icon.setAttribute("src", iconList[iconClass]);
    }
    return null;
  };

  chrome.runtime.sendMessage({
    mode: "initialize"
  }, function(response) {
    if (response.status === "success") {
      xpathExp = response.xpathExp;
      iconList = response.iconList;
      return window.addEventListener("DOMNodeInserted", handleDOM, false);
    } else {
      return console.error("initialize error: " + response.message);
    }
  });

}).call(this);
