//@ sourceMappingURL=background.map
(function() {
  var getIconList, getXpathExpression, loadOptions, saveOptions;

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var dfd, iconList, options, xpathExp;

    switch (request.mode) {
      case "initialize":
        iconList = {};
        xpathExp = "";
        dfd = $.Deferred();
        dfd.then(getIconList().then(function(list) {
          iconList = list;
          return getXpathExpression(iconList);
        }).then(function(exp) {
          return xpathExp = exp;
        }).done(function() {
          return sendResponse({
            status: "success",
            iconList: iconList,
            xpathExp: xpathExp
          });
        }).fail(function(message) {
          return sendResponse({
            status: "failure",
            message: message
          });
        }));
        break;
      case "loadOptions":
        options = loadOptions();
        sendResponse({
          status: "success",
          options: options
        });
        break;
      case "saveOptions":
        saveOptions(request.options);
        sendResponse({
          status: "success"
        });
        break;
      default:
        console.error("Undefined function: " + request.mode);
    }
    return true;
  });

  saveOptions = function(options) {
    var option_json;

    option_json = JSON.stringify(options);
    return localStorage.setItem("options", option_json);
  };

  loadOptions = function() {
    return JSON.parse(localStorage.getItem("options"));
  };

  getIconList = function() {
    var dfd, options;

    dfd = $.Deferred();
    options = loadOptions();
    if (options.apiEndpoint) {
      $.getJSON(options.apiEndpoint, function(res) {
        var iconList;

        iconList = {};
        $.each(res, function(index, icon) {
          return iconList[icon.class_name] = icon.base64_encoded_data;
        });
        return dfd.resolve(iconList);
      });
    } else {
      dfd.reject("API Endpoint is empty.");
    }
    return dfd.promise();
  };

  getXpathExpression = function(iconList) {
    var dfd, i, xpath;

    dfd = $.Deferred();
    xpath = new String();
    xpath += './/img[';
    i = 0;
    $.each(iconList, function(iconClass) {
      if (i !== 0) {
        xpath += ' or ';
      }
      xpath += 'contains(concat(" ", @class, " "), " ' + iconClass + ' ")';
      return i++;
    });
    xpath += ']';
    dfd.resolve(xpath);
    return dfd.promise();
  };

}).call(this);
