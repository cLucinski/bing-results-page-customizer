const checkbox = document.getElementById("toggleCopilot");

// Load saved state
chrome.storage.sync.get(["hideCopilot"], (result) => {
  checkbox.checked = result.hideCopilot || false;
});

checkbox.addEventListener("change", () => {
  const hide = checkbox.checked;
  chrome.storage.sync.set({ hideCopilot: hide });

  // Tell the content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggleCopilot",
      hide: hide
    });
  });
});
