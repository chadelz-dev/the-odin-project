export function initDropdowns(options = {}) {
  console.log(
    'initDropdowns called, dropdowns:',
    document.querySelectorAll('[data-dropdown]').length
  );

  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle');
    const content = dropdown.querySelector('[data-dropdown-content]');

    if (!toggle || !content) {
      console.error('Missing toggle or content in dropdown:', dropdown);
    }

    toggle.addEventListener(options.triggerEvent || 'click', () => {
      console.log('dropdown toggle clicked');

      content.classList.toggle('is-visible');
    });
  });
}
