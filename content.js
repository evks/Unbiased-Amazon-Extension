function hideBiasedElements(userPreferences) {
  const selectors = [];

  if (userPreferences.hideSponsored) {
    selectors.push(
      '.AdHolder',
      '.s-sponsored-label-info-icon',
      '[data-component-type="sp-sponsored-result"]',
      '[aria-label*="Sponsored"]',
      'div:has(span:contains("Sponsored"))'
    );
  }
  if (userPreferences.hideAmazonChoice) {
    selectors.push('[aria-label="Amazon\'s Choice"]', '.s-label-popover-default');
  }

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  console.log("Bias filters applied ✅");

  if (userPreferences.showTransparencyOverlay) {
    addTransparencyOverlay();
  }
}

function addTransparencyOverlay() {
  document.querySelectorAll('[data-asin]').forEach(product => {
    const reviews = product.innerText.match(/\d+ ratings|\d+ reviews/gi);
    const rating = product.innerText.match(/\d\.\d out of 5 stars/);
    const transparencyBox = document.createElement('div');
    transparencyBox.style.cssText = 'position:absolute;top:0;right:0;background:#fff;color:#000;font-size:10px;padding:2px;z-index:1000;border:1px solid #ccc';
    transparencyBox.innerText = `✔️ Reviews: ${reviews?.[0] || 'N/A'}\n⭐ Rating: ${rating?.[0] || 'N/A'}`;
    product.style.position = 'relative';
    product.appendChild(transparencyBox);
  });
  console.log("Transparency overlay added 🕵️‍♀️");
}

chrome.storage.sync.get({
  hideSponsored: true,
  hideAmazonChoice: true,
  showTransparencyOverlay: true
}, hideBiasedElements);
