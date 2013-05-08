//@ sourceMappingURL=contentscript.map
(function() {
  var handleDOM, replaceIcon, timer, userList, xpathExp;

  xpathExp = "";

  userList = {};

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
    var userId, userIdMatch;

    userIdMatch = icon.dataset.aid.match(/[0-9]+/);
    if (!userIdMatch) {
      return;
    }
    userId = userIdMatch[0];
    if (userList[userId]) {
      icon.setAttribute("src", userList[userId]);
    }
    return null;
  };

  chrome.runtime.sendMessage({
    mode: "initialize"
  }, function(response) {
    if (response.status === "success") {
      xpathExp = response.xpathExp;
      userList = response.userList;
      return window.addEventListener("DOMNodeInserted", handleDOM, false);
    } else {
      return console.error("initialize error: " + response.message);
    }
  });

}).call(this);
