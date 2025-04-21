document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessages = document.querySelectorAll('.error-message');
    
    // track if form has been attempted to submit
    let formSubmitted = false;
    
    // reset error messages on input
    form.addEventListener('input', (e) => {
      const input = e.target;
      if (formSubmitted && input.validity.valid) {
        hideError(input);
      }
    });
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formSubmitted = true;
      
      // reset all error messages
      errorMessages.forEach(msg => msg.classList.remove('visible'));
      form.querySelectorAll('.error-state').forEach(el => el.classList.remove('error-state'));
      
      let isValid = true;
      
      // validate each required field
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.validity.valid) {
          showError(field);
          isValid = false;
        }
      });
      
      // special validation for email
      const emailField = form.querySelector('#email');
      if (emailField.value && !emailField.validity.valid) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
      
      if (isValid) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
          form.reset();
          form.classList.remove('hidden');
          successMessage.classList.add('hidden');
          formSubmitted = false;
        }, 5000);
      }
    });
    
    function showError(input, customMessage = null) {
      const errorElement = input.closest('.form-group').querySelector('.error-message');
      if (customMessage) {
        errorElement.textContent = customMessage;
      }
      errorElement.classList.add('visible');
      input.classList.add('error-state');
      input.setAttribute('aria-invalid', 'true');
    }
    
    function hideError(input) {
      const errorElement = input.closest('.form-group').querySelector('.error-message');
      errorElement.classList.remove('visible');
      input.classList.remove('error-state');
      input.removeAttribute('aria-invalid');
    }
  });