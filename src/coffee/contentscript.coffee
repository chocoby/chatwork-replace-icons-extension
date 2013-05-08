xpathExp = ""
userList = {}

timer = 0
handleDOM = ->
  return if timer

  timer = setTimeout ->
    xpath = document.evaluate(xpathExp, document, null, 7, null)
    xpathLength = xpath.snapshotLength

    i = 0
    while i < xpathLength
      replaceIcon(xpath.snapshotItem(i))
      i += 1

    timer = 0
  , 5

  null

replaceIcon = (icon) ->
  userIdMatch = icon.dataset.aid.match(/[0-9]+/)
  return unless userIdMatch

  userId = userIdMatch[0]

  if userList[userId]
    icon.setAttribute("src", userList[userId])

  null

chrome.runtime.sendMessage { mode: "initialize" }, (response) ->
  if response.status == "success"
    xpathExp = response.xpathExp
    userList = response.userList

    window.addEventListener("DOMNodeInserted", handleDOM, false)
  else
    console.error "initialize error: #{response.message}"
