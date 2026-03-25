document.addEventListener('DOMContentLoaded', (event) => {
  // Highlight.js
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  }

  // Copy Button
  document.querySelectorAll('pre').forEach((block) => {
    // Only add button if there is code inside
    if (block.querySelector('code')) {
      const button = document.createElement('button');
      button.innerText = 'Copy';
      button.className = 'copy-btn';
      block.appendChild(button);

      button.addEventListener('click', () => {
        const code = block.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = 'Copied!';
          setTimeout(() => {
            button.innerText = 'Copy';
          }, 2000);
        });
      });
    }
  });
});
