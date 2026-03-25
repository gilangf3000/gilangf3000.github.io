document.addEventListener('DOMContentLoaded', (event) => {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  }
});
