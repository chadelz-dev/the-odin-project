import { initDropdowns } from './js/dropdown.js';
import { initCarousels } from './js/carousel.js';

console.log('Starting initialization');

try {
  initDropdowns({ triggerEvent: 'click' });
  console.log('Dropdowns initialized succesfully');
} catch (error) {
  console.error('Error initializing dropdowns:', error);
}

try {
  initCarousels({ autoAdvanceInterval: 1250 });
} catch (error) {
  console.error('Error initializing carousels:', error);
}
