// Draft toggle functionality
(function() {
  'use strict';

  // Check if we're in development mode (Hugo server)
  const isDevelopment = window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1' ||
                       window.location.port !== '';

  // Only show draft functionality in development
  if (!isDevelopment) {
    return;
  }

  // Initialize draft toggle buttons
  function initDraftToggle() {
    const buttons = document.querySelectorAll('#draftToggle, #draftToggleMobile');

    if (buttons.length === 0) {
      return; // No draft toggle buttons found
    }

    // Get initial state from localStorage
    const draftsVisible = localStorage.getItem('drafts-visible') === 'true';

    // Set initial state for all buttons
    buttons.forEach(button => {
      button.classList.toggle('active', draftsVisible);
      button.title = draftsVisible ? 'Hide drafts' : 'Show drafts';
    });

    // Apply initial visibility
    applyInitialDraftState();

    // Add click handlers to all buttons
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const newState = !button.classList.contains('active');

        // Update all buttons
        buttons.forEach(btn => {
          btn.classList.toggle('active', newState);
          btn.title = newState ? 'Hide drafts' : 'Show drafts';
        });

        localStorage.setItem('drafts-visible', newState.toString());

        // Reload page to fix pagination and layout issues
        window.location.reload();
      });
    });
  }

  // Apply initial draft visibility on page load
  function applyInitialDraftState() {
    const draftsVisible = localStorage.getItem('drafts-visible') === 'true';
    const draftPosts = document.querySelectorAll('[data-draft="true"]');

    if (!draftsVisible) {
      // Remove drafts from DOM completely
      draftPosts.forEach(post => {
        post.remove();
      });

      // Trigger Masonry layout refresh after removing elements
      setTimeout(() => {
        const masonryContainer = document.querySelector('[data-masonry]');
        if (masonryContainer && window.Masonry) {
          try {
            const msnry = new window.Masonry(masonryContainer, {
              percentPosition: true
            });
            msnry.layout();
          } catch (e) {
            // Fallback: trigger resize event
            window.dispatchEvent(new Event('resize'));
          }
        }
      }, 100);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDraftToggle);
  } else {
    initDraftToggle();
  }
})();
