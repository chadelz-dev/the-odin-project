export function initDropdowns(options = {}) {
  const {
    toggleSelector = '[data-dropdown-toggle]', // button to toggle dropdown
    contentSelector = '[data-dropdown-content]', // content to show/hide
    activeClass = 'is-visible', // class for visible state
    triggerEvent = 'click', // 'click' or 'mouseover'
  } = options;

  // find all dropdowns on the page
  const dropdowns = document.querySelectorAll('[data-dropdown');
  // loop through each dropdown
  dropdowns.forEach((dropdown) => {
    // find the toggle button and content
    const toggle = dropdown.querySelector(toggleSelector);
    const content = dropdown.querySelector(contentSelector);

    // toggle visibility on trigger event
    toggle.addEventListener(triggerEvent, () => {
      const isVisible = content.classList.contains(activeClass);
      // close other dropdowns to avoid overlapping
      document
        .querySelectorAll(`.${activeClass}`)
        .forEach((el) => el.classList.remove(activeClass));
      content.classList.toggle(activeClass, !isVisible);
    });

    // close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        content.classList.remove(activeClass);
      }
    });
  });
}

initDropdowns();
