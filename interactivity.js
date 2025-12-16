// =========================================
// Advanced Interactivity Features
// =========================================

// Research Project Modal
const initResearchModals = () => {
    const modal = document.getElementById('projectModal');
    const researchCards = document.querySelectorAll('.research-card-compact');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    if (researchCards.length === 0) {
        console.warn('No research cards found');
        return;
    }

    const closeBtn = modal.querySelector('.modal-close');

    if (!closeBtn) {
        console.error('Modal close button not found');
        return;
    }

    // Open modal with project data
    const openModal = (card) => {
        console.log('Opening modal for card:', card);
        // Extract data from card
        const status = card.querySelector('.research-status')?.textContent || '';
        const title = card.querySelector('h3')?.textContent || '';
        const type = card.querySelector('.research-type')?.textContent || '';
        const summary = card.querySelector('.research-summary')?.textContent || '';
        const expanded = card.querySelector('.research-expanded');

        // Populate modal
        modal.querySelector('.modal-status').textContent = status;
        modal.querySelector('.modal-status').className = `modal-status ${card.querySelector('.research-status')?.className.split(' ')[1] || ''}`;
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-type').textContent = type;
        modal.querySelector('.modal-summary').textContent = summary;

        // Clone expanded content
        const sectionsContainer = modal.querySelector('.modal-sections');
        sectionsContainer.innerHTML = '';
        if (expanded) {
            sectionsContainer.innerHTML = expanded.innerHTML;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners
    console.log(`Adding click listeners to ${researchCards.length} research cards`);
    researchCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.style.cursor = 'pointer';
    });

    closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
};

// Enhanced Count-Up Animations
const initEnhancedCounters = () => {
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
};

// Lazy Loading Fallback (for older browsers)
const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        return; // Native lazy loading supported
    }

    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Mobile Touch Indicators for Swipeable Grid
const addSwipeIndicators = () => {
    if (window.innerWidth > 768) return;

    const grid = document.querySelector('.molecular-grid');
    if (!grid || grid.children.length <= 1) return;

    // Check if grid is scrollable
    if (grid.scrollWidth > grid.clientWidth) {
        grid.classList.add('swipeable');

        // Add visual hint on first load
        const showSwipeHint = () => {
            grid.style.paddingLeft = '20px';
            setTimeout(() => {
                grid.scrollBy({ left: 50, behavior: 'smooth' });
                setTimeout(() => {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                }, 600);
            }, 500);
        };

        // Only show hint if user hasn't scrolled yet
        let hasScrolled = false;
        grid.addEventListener('scroll', () => {
            hasScrolled = true;
        }, { once: true });

        setTimeout(() => {
            if (!hasScrolled) {
                showSwipeHint();
            }
        }, 1500);
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initResearchModals();
    initEnhancedCounters();
    initLazyLoading();

    // Mobile features
    if (window.innerWidth <= 768) {
        addSwipeIndicators();
    }

    // Re-check on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            addSwipeIndicators();
        }
    });
});
