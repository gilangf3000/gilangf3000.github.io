document.addEventListener('DOMContentLoaded', (event) => {
  // Service Worker Registration (Anti-Adblock)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('SW registered:', registration.scope);
    }).catch(function(err) {
      console.log('SW fail:', err);
    });
  }

  // Highlight.js
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  }

  // Copy Button with Font Awesome Icons
  document.querySelectorAll('pre').forEach((block) => {
    if (block.querySelector('code')) {
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.innerHTML = '<i class="fa-regular fa-copy"></i>';
      block.appendChild(button);

      button.addEventListener('click', () => {
        const code = block.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          // Success feedback
          button.innerHTML = '<i class="fa-solid fa-check" style="color: #28a745;"></i>';
          setTimeout(() => {
            button.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        });
      });
    }
  });

  // Adblock Detection Notice (Optional)
  setTimeout(() => {
    const ads = document.querySelector('ins.adsbygoogle, .monetag-ad, script[src*="monetag"]');
    const adBlockEnabled = !ads || ads.offsetHeight === 0;
    if (adBlockEnabled) {
      const notice = document.createElement('div');
      notice.innerHTML = '<div style="background:#fff3cd; color:#856404; padding:10px; font-size:13px; text-align:center; border-bottom:1px solid #ffeeba;">Adblocker terdeteksi. Mohon nonaktifkan untuk mendukung blog ini. Terima kasih! 🙏</div>';
      document.body.prepend(notice);
    }
  }, 3000);
});
