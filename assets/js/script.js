document.addEventListener('DOMContentLoaded', (event) => {
  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('SW registered:', registration.scope);
    }).catch(function (err) {
      console.log('SW fail:', err);
    });
  }

  // Interactive Search
  const header = document.getElementById('header');
  const searchToggle = document.getElementById('search-toggle');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('post-search');

  if (searchToggle && searchClose && searchInput) {
    searchToggle.addEventListener('click', () => {
      header.classList.add('search-active');
      searchInput.focus();
    });
    const closeSearch = () => {
      header.classList.remove('search-active');
      searchInput.value = '';
      document.querySelectorAll('.post-item').forEach(post => post.style.display = 'block');
    };
    searchClose.addEventListener('click', closeSearch);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('search-active')) closeSearch();
    });
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.post-item').forEach(post => {
        const title = post.querySelector('.post-title').innerText.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').innerText.toLowerCase();
        post.style.display = (title.includes(query) || excerpt.includes(query)) ? 'block' : 'none';
      });
    });
  }

  // Targeted Adblock Detection (Disabled as requested)

  // Direct Link Monetization Logic (Dynamic JSON Loading)
  let clickCounter = 0;
  let adConfig = null;

  async function loadAdConfig() {
    try {
      const response = await fetch('/assets/data/ads.json');
      adConfig = await response.json();
    } catch (e) {
      console.log('Failed to load ad config:', e);
    }
  }

  loadAdConfig();

  document.addEventListener('click', (e) => {
    if (!adConfig) return;
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    try {
      const url = new URL(link.href);
      const isExternal = url.hostname !== window.location.hostname;
      const isExcluded = adConfig.excludedDomains.some(domain => url.hostname.includes(domain));

      if (isExternal && !isExcluded) {
        clickCounter++;
        const prob = adConfig.settings.adProbability;
        const cooldown = adConfig.settings.adCooldown;

        if (Math.random() < prob || clickCounter >= cooldown) {
          const links = adConfig.directAdLinks;
          const randomAd = links[Math.floor(Math.random() * links.length)];
          window.open(randomAd, '_blank');
          clickCounter = 0;
        }
      }
    } catch (err) {}
  });

  // Reading Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // Simple Copy Button & Lightbox Logic
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

  initPostFeatures(document);
});
