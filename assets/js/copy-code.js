document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('div.highlight');

  codeBlocks.forEach((block) => {
    const pre = block.querySelector('pre');
    if (!pre) return;

    const container = document.createElement('div');
    container.className = 'code-header';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';
    copyButton.innerText = 'Copy';

    copyButton.addEventListener('click', () => {
      const code = pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
          copyButton.innerText = 'Copy';
        }, 2000);
      });
    });

    block.insertBefore(copyButton, pre);
  });
});
