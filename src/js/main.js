// Main JavaScript file for the Wedding Videographer Website

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link a');
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  const contactForm = document.querySelector('.contact-form');

  // Add scroll event listener for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Simple testimonial slider
  let currentTestimonial = 0;

  // Function to show testimonial
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      if (i === index) {
        testimonial.style.display = 'block';
      } else {
        testimonial.style.display = 'none';
      }
    });
  }

  // Initialize testimonial slider if it exists
  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);

    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Contact form validation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form elements
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      let isValid = true;

      // Simple validation
      if (!name.value.trim()) {
        highlightError(name);
        isValid = false;
      } else {
        removeError(name);
      }

      if (!validateEmail(email.value)) {
        highlightError(email);
        isValid = false;
      } else {
        removeError(email);
      }

      if (!message.value.trim()) {
        highlightError(message);
        isValid = false;
      } else {
        removeError(message);
      }

      // If valid, submit form (in this demo, just reset the form)
      if (isValid) {
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show success message and reset form
        showFormSuccess();
        contactForm.reset();
      }
    });
  }

  // Helper functions for form validation
  function highlightError(element) {
    element.classList.add('error');
  }

  function removeError(element) {
    element.classList.remove('error');
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showFormSuccess() {
    const formContainer = contactForm.parentElement;
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';

    formContainer.appendChild(successMessage);

    // Remove success message after 5 seconds
    setTimeout(() => {
      formContainer.removeChild(successMessage);
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
