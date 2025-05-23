document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    hideSponsored: true,
    hideAmazonChoice: true,
    showTransparencyOverlay: true
  }, (settings) => {
    document.getElementById('hideSponsored').checked = settings.hideSponsored;
    document.getElementById('hideAmazonChoice').checked = settings.hideAmazonChoice;
    document.getElementById('showTransparencyOverlay').checked = settings.showTransparencyOverlay;
  });
});

document.getElementById('applyFilters').addEventListener('click', () => {
  const hideSponsored = document.getElementById('hideSponsored').checked;
  const hideAmazonChoice = document.getElementById('hideAmazonChoice').checked;
  const showTransparencyOverlay = document.getElementById('showTransparencyOverlay').checked;

  chrome.storage.sync.set({
    hideSponsored,
    hideAmazonChoice,
    showTransparencyOverlay
  }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          location.reload(); // Refresh to reapply updated preferences
        }
      });
    });
  });
});
