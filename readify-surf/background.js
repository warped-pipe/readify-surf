chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url) return;
  
    const readifyUrl = `https://readify.me/${tab.url}`;
  
    if (tab.url.startsWith("https://readify.me/")) {
      // Exit Readify mode by removing the prefix
      const originalUrl = tab.url.replace("https://readify.me/", "");
      chrome.tabs.update(tab.id, { url: originalUrl });
    } else {
      // Enter Readify mode
      chrome.tabs.update(tab.id, { url: readifyUrl });
    }
  });
  
  // Add context menu for links
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "open-in-readify",
      title: "Open in Readify.me",
      contexts: ["link"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-in-readify" && info.linkUrl) {
      const readifyUrl = `https://readify.me/${info.linkUrl}`;
      chrome.tabs.create({ url: readifyUrl });
    }
  });