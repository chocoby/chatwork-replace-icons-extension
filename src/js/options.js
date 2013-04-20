//@ sourceMappingURL=options.map
(function() {
  var loadOptions, saveOptions;

  loadOptions = function() {
    return chrome.runtime.sendMessage({
      mode: "loadOptions"
    }, function(response) {
      var options;

      options = response.options;
      return $("#api-endpoint").val(options.apiEndpoint);
    });
  };

  saveOptions = function() {
    var apiEndpoint, options;

    apiEndpoint = $("#api-endpoint").val();
    options = {
      apiEndpoint: apiEndpoint
    };
    return chrome.runtime.sendMessage({
      mode: "saveOptions",
      options: options
    }, function(response) {
      return $("#status").text("Options saved.");
    });
  };

  $(document).ready(function() {
    return loadOptions();
  });

  $("#submit").click(function() {
    return saveOptions();
  });

}).call(this);
