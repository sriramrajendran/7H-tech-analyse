/**
 * Micro-interactions JavaScript for BeaconOfTech
 * Handles subtle animations and transitions for enhanced user experience
 */

class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupButtonRipples();
        this.setupSmoothScrolling();
        this.setupHoverEffects();
        this.setupLoadingStates();
    }

    /**
     * Setup Intersection Observer for section animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate children with stagger
                    const children = entry.target.querySelectorAll('.section-content > *');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Setup ripple effect for buttons
     */
    setupButtonRipples() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (!button) return;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Setup enhanced hover effects
     */
    setupHoverEffects() {
        // Card hover effects
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) translateZ(0)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) translateZ(0)';
            });
        });

        // Navigation link effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('.nav-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('.nav-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    /**
     * Setup loading states with shimmer effect
     */
    setupLoadingStates() {
        // Add shimmer class to loading elements
        const addShimmer = (element) => {
            if (!element) return;
            element.classList.add('shimmer');
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
        };

        const removeShimmer = (element) => {
            if (!element) return;
            element.classList.remove('shimmer');
        };

        // Global loading state management
        const showGlobalLoading = () => {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                addShimmer(mainContent);
            }
        };

        const hideGlobalLoading = () => {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                removeShimmer(mainContent);
            }
        };

        // Example usage for dynamic content loading
        window.showLoading = (elementOrMessage) => {
            // Check if it's a string message (from main-github.js showLoading)
            if (typeof elementOrMessage === 'string') {
                // Call the original showLoading from main-github.js if it exists
                if (window.originalShowLoading) {
                    window.originalShowLoading(elementOrMessage);
                } else {
                    // Fallback: show global loading
                    showGlobalLoading();
                }
            } else if (elementOrMessage) {
                // It's an element, add shimmer effect
                addShimmer(elementOrMessage);
            } else {
                // No parameter, show global loading
                showGlobalLoading();
            }
        };
        
        window.hideLoading = (element) => {
            if (element) {
                removeShimmer(element);
            } else {
                // Try to call original hideLoading from main-github.js if it exists
                if (window.originalHideLoading) {
                    window.originalHideLoading();
                } else {
                    // Fallback: hide global loading shimmer
                    hideGlobalLoading();
                }
            }
        };
    }

    /**
     * Add parallax effect to hero sections
     */
    setupParallax() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    /**
     * Add magnetic effect to buttons
     */
    setupMagneticButtons() {
        document.querySelectorAll('.btn-magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateZ(0)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) translateZ(0)';
            });
        });
    }

    /**
     * Add text gradient animation
     */
    setupTextGradients() {
        const gradientTexts = document.querySelectorAll('.text-gradient-animated');
        
        gradientTexts.forEach(text => {
            text.style.background = 'linear-gradient(270deg, #3b82f6, #06b6d4, #10b981, #3b82f6)';
            text.style.backgroundSize = '800% 800%';
            text.style.animation = 'gradientShift 8s ease infinite';
        });
    }
}

// Add CSS for ripple effect
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Initialize micro-interactions when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MicroInteractions();
    });
} else {
    new MicroInteractions();
}

// Export for external use
window.MicroInteractions = MicroInteractions;
