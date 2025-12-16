// =========================================
// Premium Animations & Effects
// =========================================

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Short delay for dramatic effect
    }
});

// Enhanced Scroll Animations
const initScrollAnimations = () => {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(el => scrollObserver.observe(el));
};

// Particle System
const initParticles = () => {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration (15-30s)
        const duration = 15000 + Math.random() * 15000;
        particle.style.animationDuration = `${duration}ms`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5000}ms`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Random size (4-8px)
        const size = 4 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        container.appendChild(particle);
    }
};

// Parallax Scrolling
const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .tennis-bg-parallax');
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            
            // Only apply parallax if element is in viewport
            if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
                const offset = (scrolled - elementTop) * 0.5;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
};

// Add scroll animation attributes to elements
const addScrollAttributes = () => {
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('fade-up');
        }
    });
    
    // Section subtitles
    document.querySelectorAll('.section-subtitle').forEach(el => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('fade-up');
        }
    });
    
    // Research cards with stagger
    document.querySelectorAll('.research-card-compact').forEach((el, index) => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('fade-up', `delay-${Math.min(index + 1, 5)}`);
        }
    });
    
    // Stat cards with stagger
    document.querySelectorAll('.stat-card').forEach((el, index) => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('scale-in', `delay-${Math.min(index + 1, 5)}`);
        }
    });
    
    // Value cards
    document.querySelectorAll('.value-card').forEach((el, index) => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('fade-up', `delay-${Math.min(index + 1, 3)}`);
        }
    });
    
    // Molecule cards (tennis section)
    document.querySelectorAll('.molecule-card').forEach((el, index) => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('scale-in', `delay-${Math.min(index + 1, 4)}`);
        }
    });
    
    // Impact cards
    document.querySelectorAll('.impact-card').forEach((el, index) => {
        if (!el.hasAttribute('data-scroll')) {
            el.setAttribute('data-scroll', '');
            el.classList.add('fade-up', `delay-${Math.min(index + 1, 3)}`);
        }
    });
    
    // Chart container
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer && !chartContainer.hasAttribute('data-scroll')) {
        chartContainer.setAttribute('data-scroll', '');
        chartContainer.classList.add('fade-in');
    }
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        addScrollAttributes();
        initScrollAnimations();
        initParticles();
        initParallax();
    } else {
        // If reduced motion, just remove preloader quickly
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 100);
        }
    }
});
