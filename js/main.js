/**
 * Jett Portfolio - Main JavaScript
 * Fast, elegant, and smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTheme();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initFormHandling();
    initSkillProgress();
});

/**
 * Theme Toggle
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle mobile menu
            navLinks.classList.toggle('active');

            // Animate hamburger
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Listen for scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form handling
 */
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;

            // Loading state
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Success state
                submitButton.innerHTML = '<span>Message Sent!</span>';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });

        // Add input focus effects
        const formGroups = contactForm.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');

            if (input) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
            }
        });
    }
}

/**
 * Animate skill progress bars
 */
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');

    const animateProgress = () => {
        skillCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');

            if (progressBar) {
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // When card is in view
                if (rect.top < windowHeight - 100) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    progressBar.style.width = progress;
                }
            }
        });
    };

    // Initial check
    animateProgress();

    // Listen for scroll
    window.addEventListener('scroll', animateProgress, { passive: true });
}

/**
 * Optional: Add parallax effect to elements
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

/**
 * Optional: Add hover sound effects (commented out by default)
 */
// function initSoundEffects() {
//     const hoverSound = new Audio('path/to/hover-sound.mp3');
//     const clickSound = new Audio('path/to/click-sound.mp3');
//
//     document.querySelectorAll('a, button').forEach(element => {
//         element.addEventListener('mouseenter', () => {
//             hoverSound.volume = 0.1;
//             hoverSound.play().catch(() => {});
//         });
//     });
// }

/**
 * Intersection Observer for section animations
 */
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Add staggered animations to children
                const children = entry.target.querySelectorAll('.skill-card, .project-card, .stat');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize section animations
initSectionAnimations();

/**
 * Utility: Debounce function
 */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}