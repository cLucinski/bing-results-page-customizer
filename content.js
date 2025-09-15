function setCopilotVisibility(hide) {
  const copilotDiv = document.getElementById("b_bop_cs_sb_place");
  if (copilotDiv) {
    copilotDiv.style.display = hide ? "none" : "";
  }
}

// Check stored setting on load
chrome.storage.sync.get(["hideCopilot"], (result) => {
  if (result.hideCopilot) {
    setCopilotVisibility(true);
  }
});

// Listen for toggle messages
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleCopilot") {
    setCopilotVisibility(message.hide);
  }
});
