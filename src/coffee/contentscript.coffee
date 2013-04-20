xpathExp = ""
iconList = {}

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
  classNameMatch = icon.className.match(/cw_a[0-9]+/)
  return unless classNameMatch

  iconClass = classNameMatch[0]

  if iconList[iconClass]
    icon.setAttribute("src", iconList[iconClass])

  null

chrome.runtime.sendMessage { mode: "initialize" }, (response) ->
  if response.status == "success"
    xpathExp = response.xpathExp
    iconList = response.iconList

    window.addEventListener("DOMNodeInserted", handleDOM, false)
  else
    console.error "initialize error: #{response.message}"
