chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  switch request.mode
    when "initialize"
      userList = {}
      xpathExp = ""

      dfd = $.Deferred()
      dfd.then getUserList()
      .then (list) ->
        userList = list
        getXpathExpression(userList)
      .then (exp) ->
        xpathExp = exp
      .done ->
        sendResponse { status: "success", userList: userList, xpathExp: xpathExp }
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

getUserList = ->
  dfd = $.Deferred()

  options = loadOptions()

  if options.apiEndpoint
    $.getJSON options.apiEndpoint, (res) ->
      userList = {}

      $.each res, (index, user) ->
        userList[user.class_name] = user.data_uri_encoded_data

      dfd.resolve(userList)
  else
    dfd.reject("API Endpoint is empty.")

  dfd.promise()

getXpathExpression = (userList) ->
  dfd = $.Deferred()

  xpath = new String()
  xpath += './/img['

  i = 0
  $.each userList, (userId) ->
    unless i == 0
      xpath += ' or '
    xpath += 'contains(concat(" ", @data-aid, " "), " ' + userId + ' ")'

    i++

  xpath += ']'

  dfd.resolve(xpath)
  dfd.promise()
