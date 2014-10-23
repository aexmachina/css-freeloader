function messageTab(tab, command, data){
  var res = chrome.tabs.sendMessage(tab.id, {
    command: command,
    data: data
  });
  return res;
}

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    return messageTab(tabs[0], command, {});
  });
});
