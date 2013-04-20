loadOptions = ->
  chrome.runtime.sendMessage { mode: "loadOptions" }, (response) ->
    options = response.options
    $("#api-endpoint").val options.apiEndpoint

saveOptions = ->
  apiEndpoint = $("#api-endpoint").val()
  options = {
    apiEndpoint: apiEndpoint,
  }
  chrome.runtime.sendMessage { mode: "saveOptions", options: options }, (response) ->
    $("#status").text "Options saved."

$(document).ready ->
  loadOptions()

$("#submit").click ->
  saveOptions()
