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
      block.parentNode.insertBefore(button, block);

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

  // Targeted Adblock Detection (Disabled as requested)
  // [Detection logic removed]

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
      const randomAd = directAdLinks[Math.floor(Math.random() * directAdLinks.length)];
      window.open(randomAd, '_blank');
    }
  });

  // Simple Copy Button & Lightbox Logic (Now global and immediate)
  function initPostFeatures(container) {
    // Copy Buttons
    container.querySelectorAll('pre').forEach((block) => {
      if (block.querySelector('code') && !block.parentNode.querySelector('.copy-btn')) {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fa-regular fa-copy"></i>';
        block.parentNode.insertBefore(button, block);
        
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

    // Lightbox
    container.querySelectorAll('img').forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `<img src="${img.src}" class="lightbox-img">`;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.style.opacity = '1', 10);
        overlay.addEventListener('click', () => {
          overlay.style.opacity = '0';
          setTimeout(() => overlay.remove(), 300);
        });
      });
    });
  }

  // Initialize features on whole document
  initPostFeatures(document);
});
