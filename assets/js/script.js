document.addEventListener('DOMContentLoaded', (event) => {
  // Service Worker Registration (Anti-Adblock)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('SW registered:', registration.scope);
    }).catch(function (err) {
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
          button.innerHTML = '<i class="fa-solid fa-check" style="color: #28a745;"></i>';
          setTimeout(() => {
            button.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        });
      });
    }
  });

  // Interactive Modern Search
  const header = document.getElementById('header');
  const searchToggle = document.getElementById('search-toggle');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('post-search');

  if (searchToggle && searchClose && searchInput) {
    // Open Search
    searchToggle.addEventListener('click', () => {
      header.classList.add('search-active');
      searchInput.focus();
    });

    // Close Search
    const closeSearch = () => {
      header.classList.remove('search-active');
      searchInput.value = '';
      // Reset post visibility
      document.querySelectorAll('.post-item').forEach(post => post.style.display = 'block');
    };

    searchClose.addEventListener('click', closeSearch);

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('search-active')) {
        closeSearch();
      }
    });

    // Filtering Logic
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const posts = document.querySelectorAll('.post-item');

      posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').innerText.toLowerCase();

        if (title.includes(query) || excerpt.includes(query)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
    });
  }

  // Targeted Adblock Detection via Monetag Domain
  async function checkAdBlock() {
    const monetagUrl = 'https://quge5.com/88/tag.min.js';
    try {
      await fetch(new Request(monetagUrl, { method: 'HEAD', mode: 'no-cors' }));
      return false; // Monetag OK
    } catch (e) {
      return true; // Monetag Blocked (likely by DNS or aggressive adblock)
    }
  }

  checkAdBlock().then(isBlocked => {
    if (isBlocked) {
      const notice = document.createElement('div');
      notice.id = 'adblock-notice';
      notice.innerHTML = '<div style="background:#fff3cd; color:#856404; padding:10px; font-size:13px; text-align:center; border-bottom:1px solid #ffeeba; position:relative; z-index:9999;">Adblocker terdeteksi. Mohon nonaktifkan untuk mendukung blog ini. Terima kasih! 🙏</div>';
      document.body.prepend(notice);
    }
  });

  // Direct Link Monetization Logic
  const directAdLinks = [
    'https://omg10.com/4/10785481',
    'https://omg10.com/4/10785484',
    'https://omg10.com/4/10785480',
    'https://omg10.com/4/10785476',
    'https://omg10.com/4/10785482'
  ];

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    const url = new URL(link.href);
    const isExternal = url.hostname !== window.location.hostname;
    const isExcluded = url.hostname.includes('awancore.biz.id');

    if (isExternal && !isExcluded) {
      // Pick a random ad link
      const randomAd = directAdLinks[Math.floor(Math.random() * directAdLinks.length)];
      // Open ad in new tab
      window.open(randomAd, '_blank');
      // Navigation continues in original tab as normal
    }
  });
});
