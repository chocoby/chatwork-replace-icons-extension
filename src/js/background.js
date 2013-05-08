//@ sourceMappingURL=background.map
(function() {
  var getUserList, getXpathExpression, loadOptions, saveOptions;

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var dfd, options, userList, xpathExp;

    switch (request.mode) {
      case "initialize":
        userList = {};
        xpathExp = "";
        dfd = $.Deferred();
        dfd.then(getUserList().then(function(list) {
          userList = list;
          return getXpathExpression(userList);
        }).then(function(exp) {
          return xpathExp = exp;
        }).done(function() {
          return sendResponse({
            status: "success",
            userList: userList,
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

  getUserList = function() {
    var dfd, options;

    dfd = $.Deferred();
    options = loadOptions();
    if (options.apiEndpoint) {
      $.getJSON(options.apiEndpoint, function(res) {
        var userList;

        userList = {};
        $.each(res, function(index, user) {
          return userList[user.class_name] = user.data_uri_encoded_data;
        });
        return dfd.resolve(userList);
      });
    } else {
      dfd.reject("API Endpoint is empty.");
    }
    return dfd.promise();
  };

  getXpathExpression = function(userList) {
    var dfd, i, xpath;

    dfd = $.Deferred();
    xpath = new String();
    xpath += './/img[';
    i = 0;
    $.each(userList, function(userId) {
      if (i !== 0) {
        xpath += ' or ';
      }
      xpath += 'contains(concat(" ", @data-aid, " "), " ' + userId + ' ")';
      return i++;
    });
    xpath += ']';
    dfd.resolve(xpath);
    return dfd.promise();
  };

}).call(this);
