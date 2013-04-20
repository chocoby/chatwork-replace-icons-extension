chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  switch request.mode
    when "initialize"
      iconList = {}
      xpathExp = ""

      dfd = $.Deferred()
      dfd.then getIconList()
      .then (list) ->
        iconList = list
        getXpathExpression(iconList)
      .then (exp) ->
        xpathExp = exp
      .done ->
        sendResponse { status: "success", iconList: iconList, xpathExp: xpathExp }
      .fail (message) ->
        sendResponse { status: "failure", message: message }
    when "loadOptions"
      options = loadOptions()
      sendResponse { status: "success", options: options }
    when "saveOptions"
      saveOptions request.options
      sendResponse { status: "success" }
    else
      console.error "Undefined function: #{request.mode}"

  true

saveOptions = (options) ->
  option_json = JSON.stringify(options)
  localStorage.setItem "options", option_json

loadOptions = ->
  JSON.parse(localStorage.getItem "options")

# TODO: change method name!
getIconList = ->
  dfd = $.Deferred()

  options = loadOptions()

  if options.apiEndpoint
    $.getJSON options.apiEndpoint, (res) ->
      iconList = {}

      $.each res, (index, icon) ->
        iconList[icon.class_name] = icon.base64_encoded_data

      dfd.resolve(iconList)
  else
    dfd.reject("API Endpoint is empty.")

  dfd.promise()

getXpathExpression = (iconList) ->
  dfd = $.Deferred()

  xpath = new String()
  xpath += './/img['

  i = 0
  $.each iconList, (iconClass) ->
    unless i == 0
      xpath += ' or '
    xpath += 'contains(concat(" ", @class, " "), " ' + iconClass + ' ")'

    i++

  xpath += ']'

  dfd.resolve(xpath)
  dfd.promise()
