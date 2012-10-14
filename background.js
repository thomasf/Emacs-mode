function onRequest(request, sender, callback) {
    switch (request.action) {
    case "CLOSE_WINDOW":
        chrome.windows.remove(sender.tab.windowId);
        break;
    case "CLOSE_ALL_WINDOWS":
        chrome.windows.getAll({}, function(ws) { for (i in ws) chrome.windows.remove(ws[i].id); });
        break;
    case "NEW_WINDOW":
        chrome.windows.create({}, function(){});
        break;
    case "CLOSE_TAB":
        chrome.tabs.remove(sender.tab.id);
        break;
    case "NEW_TAB":
        chrome.tabs.create({'windowId':sender.tab.windowId}, function(){});
        break;
    case "DISABLE":
        chrome.browserAction.setIcon({'path':"emacs_disabled.png",'tabId':sender.tab.id});
        break;
    case "ENABLE":
        chrome.browserAction.setIcon({'path':"emacs.png",'tabId':sender.tab.id});
        break;
    }
    if (callback instanceof Function) callback({});
};
// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
// Show help, when click on logo
chrome.browserAction.onClicked.addListener(function(t) { chrome.tabs.sendRequest(t.id, {'action': 'showHelp'}) });
