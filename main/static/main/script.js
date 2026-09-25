/**
 * =========================================================
 * SAIMANTY CHAKRABORTY SHRUTI - PERSONAL PORTFOLIO JAVASCRIPT
 * Vanilla JS: Theme Toggle, Mobile Menu, Active Scroll Spy,
 * Scroll Reveal Animations, and Mailto Form Handling.
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. THEME TOGGLE (DARK / LIGHT MODE)
     Remembers preference in localStorage, defaults to system
     --------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Determine initial theme: Check saved preference, otherwise check OS setting
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark theme if system prefers dark, otherwise default to dark as preferred
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Set the theme on the <html> element
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Apply initially
  setTheme(getPreferredTheme());

  // Listen for clicks on the toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });


  /* ---------------------------------------------------------
     2. MOBILE NAVIGATION MENU
     Handles opening/closing the responsive menu on smaller screens
     --------------------------------------------------------- */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuToggle && siteNav) {
    // Toggle menu visibility
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('is-open');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when pressing the Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.focus();
      }
    });

    // Close menu when clicking outside of the navigation
    document.addEventListener('click', (e) => {
      if (
        siteNav.classList.contains('is-open') &&
        !siteNav.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        siteNav.classList.remove('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ---------------------------------------------------------
     3. ACTIVE SECTION HIGHLIGHT ON SCROLL
     Highlights the current section's link in the navigation
     --------------------------------------------------------- */
  const sections = document.querySelectorAll('main > section[id]');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Activate when section is in upper-mid viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((sec) => navObserver.observe(sec));


  /* ---------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
     Fades and slides up elements as they scroll into view
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger animation once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach((el) => revealObserver.observe(el));





});
