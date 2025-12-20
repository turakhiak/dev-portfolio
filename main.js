document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                if (entry.target.classList.contains('research-card') ||
                    entry.target.classList.contains('stat-card') ||
                    entry.target.classList.contains('activity-item')) {
                    // Calculate index within its container to stagger
                    const siblings = Array.from(entry.target.parentNode.children);
                    const indexInParent = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${indexInParent * 100}ms`;
                }

                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .hero-text, .hero-image, .research-card, .stat-card, .activity-item, .about-text p');

    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // =========================================
    // Carousel Helper Functions (Shared)
    // =========================================
    const playVideo = (slide) => {
        const video = slide.querySelector('video');
        if (video) {
            video.play().catch(e => console.log("Auto-play prevented:", e));
        }
    };

    const pauseVideo = (slide) => {
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    };

    const moveToSlide = (track, currentSlide, targetSlide) => {
        if (!targetSlide) return;
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        // Handle video playback if exists
        pauseVideo(currentSlide);
        playVideo(targetSlide);
    };

    const updateDots = (currentDot, targetDot) => {
        if (!targetDot) return;
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetSlide) => {
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };

    const setupSlidePositions = (slides) => {
        if (slides.length === 0) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    };

    // =========================================
    // Tennis Video Carousel (In Section)
    // =========================================
    const tennisVideoCarousel = document.querySelector('.tennis-carousel');
    if (tennisVideoCarousel) {
        const track = tennisVideoCarousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = tennisVideoCarousel.querySelector('.carousel-button--right');
        const prevButton = tennisVideoCarousel.querySelector('.carousel-button--left');
        const dotsNav = tennisVideoCarousel.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        setupSlidePositions(slides);

        // Initialize first slide video with Intersection Observer
        const initialSlide = track.querySelector('.current-slide');
        if (initialSlide) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        playVideo(initialSlide);
                    } else {
                        pauseVideo(initialSlide);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(tennisVideoCarousel);
        }

        // Click Left Button
        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            if (prevSlide) {
                const currentDot = dotsNav.querySelector('.current-slide');
                const prevDot = currentDot.previousElementSibling;
                moveToSlide(track, currentSlide, prevSlide);
                if (currentDot && prevDot) updateDots(currentDot, prevDot);
                hideShowArrows(slides, prevButton, nextButton, prevSlide);
            }
        });

        // Click Right Button
        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                const currentDot = dotsNav.querySelector('.current-slide');
                const nextDot = currentDot.nextElementSibling;
                moveToSlide(track, currentSlide, nextSlide);
                if (currentDot && nextDot) updateDots(currentDot, nextDot);
                hideShowArrows(slides, prevButton, nextButton, nextSlide);
            }
        });

        // Click Nav Indicators
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.indexOf(targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            if (currentDot && targetDot) updateDots(currentDot, targetDot);
            hideShowArrows(slides, prevButton, nextButton, targetSlide);
        });

        // Handle Window Resize
        window.addEventListener('resize', () => {
            setupSlidePositions(slides);
            const currentSlide = track.querySelector('.current-slide');
            if (currentSlide) {
                track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
            }
        });
    }

    // =========================================
    // Tennis Section Animations
    // =========================================

    const tennisSection = document.querySelector('#tennis');
    if (tennisSection) {
        const observerOptions = {
            threshold: 0.3
        };

        const tennisObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate Chart Line
                    const chartLine = entry.target.querySelector('.chart-line');
                    if (chartLine) {
                        chartLine.classList.add('animate');
                    }

                    // Animate Counters
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps

                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });

                    // Stop observing once animated
                    tennisObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        tennisObserver.observe(tennisSection);
    }


    // Interactive Legend Logic
    const legendTags = document.querySelectorAll('.legend-tag');
    const researchCards = document.querySelectorAll('.research-card-compact');

    legendTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Get the category class (e.g., 'innovation', 'technical')
            // It's assumed to be the second class
            const category = tag.classList[1];

            researchCards.forEach(card => {
                // Check if the card contains a learning item of this category
                const hasCategory = card.querySelector(`.learning-item.${category}`);

                if (hasCategory) {
                    card.classList.add('highlight');
                    card.classList.remove('dim');
                } else {
                    card.classList.add('dim');
                    card.classList.remove('highlight');
                }
            });
        });

        tag.addEventListener('mouseleave', () => {
            researchCards.forEach(card => {
                card.classList.remove('highlight');
                card.classList.remove('dim');
            });
        });
    });

    // Tennis Photos Modal
    const heroTennisCard = document.getElementById('heroTennisCard');
    const tennisPhotosModal = document.getElementById('tennisPhotosModal');

    if (heroTennisCard && tennisPhotosModal) {
        // Open modal when clicking tennis card
        heroTennisCard.addEventListener('click', () => {
            tennisPhotosModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close modal handlers
        const closeModal = () => {
            tennisPhotosModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Close button
        const closeButton = tennisPhotosModal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        // Click overlay to close
        tennisPhotosModal.addEventListener('click', (e) => {
            if (e.target === tennisPhotosModal) {
                closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && tennisPhotosModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Initialize carousel for tennis photos modal
        const tennisModalCarousel = tennisPhotosModal.querySelector('.tennis-photos-carousel');
        if (tennisModalCarousel) {
            const track = tennisModalCarousel.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const nextButton = tennisModalCarousel.querySelector('.carousel-button--right');
            const prevButton = tennisModalCarousel.querySelector('.carousel-button--left');
            const dotsNav = tennisModalCarousel.querySelector('.carousel-nav');
            const dots = Array.from(dotsNav.children);

            setupSlidePositions(slides);

            // Next button
            nextButton.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide');
                const nextSlide = currentSlide.nextElementSibling;

                if (nextSlide) {
                    const currentDot = dotsNav.querySelector('.current-slide');
                    const nextDot = currentDot.nextElementSibling;
                    moveToSlide(track, currentSlide, nextSlide);
                    if (currentDot && nextDot) updateDots(currentDot, nextDot);
                    hideShowArrows(slides, prevButton, nextButton, nextSlide);
                }
            });

            // Previous button
            prevButton.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide');
                const prevSlide = currentSlide.previousElementSibling;

                if (prevSlide) {
                    const currentDot = dotsNav.querySelector('.current-slide');
                    const prevDot = currentDot.previousElementSibling;
                    moveToSlide(track, currentSlide, prevSlide);
                    if (currentDot && prevDot) updateDots(currentDot, prevDot);
                    hideShowArrows(slides, prevButton, nextButton, prevSlide);
                }
            });

            // Dot navigation
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;

                const currentSlide = track.querySelector('.current-slide');
                const currentDot = dotsNav.querySelector('.current-slide');
                const targetIndex = dots.indexOf(targetDot);
                const targetSlide = slides[targetIndex];

                moveToSlide(track, currentSlide, targetSlide);
                if (currentDot && targetDot) updateDots(currentDot, targetDot);
                hideShowArrows(slides, prevButton, nextButton, targetSlide);
            });

            // Handle Window Resize for modal carousel too
            window.addEventListener('resize', () => {
                setupSlidePositions(slides);
                const currentSlide = track.querySelector('.current-slide');
                if (currentSlide) {
                    track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
                }
            });
        }
    }
});

