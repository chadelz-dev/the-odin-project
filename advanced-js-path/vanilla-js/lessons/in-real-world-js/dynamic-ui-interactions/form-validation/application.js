// Get form and input elements
const applicationForm = document.getElementById('applicationForm');
const applicantNameInput = document.getElementById('applicantName');
const applicantEmailInput = document.getElementById('applicantEmail');
const applicantCountryInput = document.getElementById('applicantCountry');
const applicantPostalCodeInput = document.getElementById('applicantPostalCode');
const applicantPasswordInput = document.getElementById('applicantPassword');
const applicantPasswordConfirmInput = document.getElementById(
  'applicantPasswordConfirm'
);
const applicantNameError = document.getElementById('applicantNameError');
const applicantEmailError = document.getElementById('applicantEmailError');
const applicantCountryError = document.getElementById('applicantCountryError');
const applicantPostalCodeError = document.getElementById(
  'applicantPostalCodeError'
);
const applicantPasswordError = document.getElementById(
  'applicantPasswordError'
);
const applicantPasswordConfirmError = document.getElementById(
  'applicantPasswordConfirmError'
);
const successMessage = document.getElementById('successMessage');

// Validate full name on input
applicantNameInput.addEventListener('input', () => {
  // Check name validity
  if (applicantNameInput.validity.valueMissing) {
    applicantNameError.textContent = 'Please enter your full name.';
  } else if (applicantNameInput.validity.patternMismatch) {
    applicantNameError.textContent =
      'Name must contain only letters and spaces.';
  } else {
    applicantNameError.textContent = '';
  }
});

// Validate email on input
applicantEmailInput.addEventListener('input', () => {
  // Check email validity
  if (applicantEmailInput.validity.valueMissing) {
    applicantEmailError.textContent = 'Please enter an email.';
  } else if (applicantEmailInput.validity.typeMismatch) {
    applicantEmailError.textContent =
      'Please enter a valid email (e.g., name@company.com).';
  } else {
    applicantEmailError.textContent = '';
  }
});

// Validate country on input
applicantCountryInput.addEventListener('input', () => {
  // Check country validity
  if (applicantCountryInput.validity.valueMissing) {
    applicantCountryError.textContent = 'Please enter a country.';
  } else if (applicantCountryInput.validity.patternMismatch) {
    applicantCountryError.textContent =
      'Country must contain only letters and spaces.';
  } else {
    applicantCountryError.textContent = '';
  }
});

// Validate postal code on input
applicantPostalCodeInput.addEventListener('input', () => {
  // Check postal code validity
  if (applicantPostalCodeInput.validity.valueMissing) {
    applicantPostalCodeError.textContent = 'Please enter a postal code.';
  } else if (applicantPostalCodeInput.validity.patternMismatch) {
    applicantPostalCodeError.textContent =
      'Postal code must be 3-10 characters (letters, numbers, or hyphens).';
  } else {
    applicantPostalCodeError.textContent = '';
  }
});

// Validate password on input
applicantPasswordInput.addEventListener('input', () => {
  // Check password length
  if (applicantPasswordInput.validity.valueMissing) {
    applicantPasswordError.textContent = 'Please enter a password.';
  } else if (applicantPasswordInput.validity.tooShort) {
    applicantPasswordError.textContent =
      'Password must be at least 8 characters.';
  } else {
    applicantPasswordError.textContent = '';
  }
  // Re-validate confirm password if filled
  if (applicantPasswordConfirmInput.value) {
    applicantPasswordConfirmInput.dispatchEvent(new Event('input'));
  }
});

// Validate password confirmation on input
applicantPasswordConfirmInput.addEventListener('input', () => {
  // Check if passwords match
  if (applicantPasswordConfirmInput.value !== applicantPasswordInput.value) {
    applicantPasswordConfirmInput.setCustomValidity('Passwords do not match.'); // Set custom error
    applicantPasswordConfirmError.textContent = 'Passwords do not match.';
  } else {
    applicantPasswordConfirmInput.setCustomValidity(''); // Clear custom error
    applicantPasswordConfirmError.textContent = '';
  }
});

// Handle form submission
applicationForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default submission
  // Trigger validation for all fields
  [
    applicantNameInput,
    applicantEmailInput,
    applicantCountryInput,
    applicantPostalCodeInput,
    applicantPasswordInput,
    applicantPasswordConfirmInput,
  ].forEach((input) => input.dispatchEvent(new Event('input')));
  // Check if form is valid
  if (applicationForm.checkValidity()) {
    successMessage.style.display = 'block'; // Show high five message
    setTimeout(() => {
      successMessage.style.display = 'none'; // Hide after 3 seconds
      applicationForm.reset(); // Reset form
    }, 3000);
  }
});
