// Main JavaScript for GitHub Pages version - Premium Edition - Optimized
// Initialize page with performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize sidebar visibility based on screen size
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const icon = mobileMenuBtn?.querySelector('.icon');
    
    if (sidebar) {
        if (window.innerWidth > 767) {
            sidebar.classList.remove('hidden');
            if (icon) {
                icon.setAttribute('data-lucide', 'x');
            }
        } else {
            sidebar.classList.add('hidden');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
            }
        }
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Initialize premium interactions
    initializePremiumFeatures();
    
    // Optimized page manager initialization
    requestAnimationFrame(() => {
        initializePageManager();
    });
});

function initializePageManager() {
    const pm = typeof pageManager !== 'undefined' ? pageManager : window.pageManager;
    
    if (pm) {
        // Set up navigation with event delegation for better performance
        const navContainer = document.querySelector('.sidebar-nav');
        if (navContainer) {
            navContainer.addEventListener('click', (e) => {
                const link = e.target.closest('.nav-link');
                if (link) {
                    e.preventDefault();
                    const pageType = link.getAttribute('data-page');
                    pm.loadPage(pageType);
                    
                    updateParentHighlighting(link);
                    
                    // Update active states
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    if (window.innerWidth <= 767) {
                        const sidebar = document.querySelector('.sidebar');
                        if (sidebar && !sidebar.classList.contains('hidden')) {
                            toggleMobileMenu();
                        }
                    }
                }
            });
        }
        
        // Load default page
        pm.loadPage('tech-blog');
        
        // Set initial active state
        const techBlogLink = document.getElementById('nav-tech-blog');
        if (techBlogLink) {
            techBlogLink.classList.add('active');
            updateParentHighlighting(techBlogLink);
        }
        
        // Ensure global stock analyzer is available
        if (!window.stockAnalyzer) {
            window.stockAnalyzer = new StockAnalyzer('AAPL');
        }
    } else {
        // Optimized retry mechanism
        if (!this.retryCount) this.retryCount = 0;
        if (this.retryCount < 3) {
            this.retryCount++;
            requestAnimationFrame(() => {
                initializePageManager();
            });
        } else {
            createFallbackPageManager();
        }
    }
}

function createFallbackPageManager() {
    window.pageManager = {
        loadPage: function(pageType) {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = `
                    <div class="page-header">
                        <h2>${pageType.replace('-', ' ').toUpperCase()}</h2>
                        <p>Page loading failed. Please refresh the page.</p>
                    </div>
                `;
            }
        }
    };
}

// Initialize premium features
function initializePremiumFeatures() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation collapsible sections
    initializeCollapsibleNav();
    
    // Header buttons
    initializeHeaderButtons();
    
    // Smooth scroll behavior
    initializeSmoothScroll();
    
    // Loading animations
    initializeLoadingAnimations();
    
    // Modal event handlers
    setupESCKeyHandler();
    setupModalClickOutsideHandler();
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn?.querySelector('.icon');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        if (icon) {
            icon.setAttribute('data-lucide', 'moon');
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (icon) {
            icon.setAttribute('data-lucide', 'sun');
        }
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn?.querySelector('.icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (icon) {
            icon.setAttribute('data-lucide', 'moon');
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const icon = mobileMenuBtn?.querySelector('.icon');
    
    if (sidebar) {
        // Toggle hidden class
        sidebar.classList.toggle('hidden');
        
        // Update icon based on menu state
        if (sidebar.classList.contains('hidden')) {
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
            }
            // Remove overlay when menu is hidden
            removeMobileMenuOverlay();
            // Remove body scroll lock
            document.body.style.overflow = '';
        } else {
            if (icon) {
                icon.setAttribute('data-lucide', 'x');
            }
            // Add overlay to close menu when clicking outside
            addMobileMenuOverlay();
            // Lock body scroll when menu is open on mobile
            if (window.innerWidth <= 767) {
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Add overlay for mobile menu
function addMobileMenuOverlay() {
    // Only add overlay on mobile
    if (window.innerWidth > 767) return;
    
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.addEventListener('click', toggleMobileMenu);
        document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
}

// Remove overlay for mobile menu
function removeMobileMenuOverlay() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Update parent highlighting when child is active
function updateParentHighlighting(activeLink) {
    // Remove all parent highlighting
    document.querySelectorAll('.nav-parent').forEach(parent => {
        parent.classList.remove('has-active-child');
    });
    
    // Add highlighting to parent of active link
    const parent = activeLink.closest('.nav-children');
    if (parent) {
        const parentSection = parent.previousElementSibling;
        if (parentSection && parentSection.classList && parentSection.classList.contains('nav-parent')) {
            parentSection.classList.add('has-active-child');
        }
    }
}

// Update parent highlighting when page changes
function updateParentHighlightingForPage(pageType) {
    // Remove all parent highlighting
    document.querySelectorAll('.nav-parent').forEach(parent => {
        parent.classList.remove('has-active-child');
        parent.classList.remove('active');
    });
    
    // Find the active link for this page type
    const activeLink = document.getElementById(`nav-${pageType}`);
    if (activeLink) {
        updateParentHighlighting(activeLink);
        
        // On mobile, keep the parent menu open if child is active
        if (window.innerWidth <= 768) {
            const parentSection = activeLink.closest('.nav-children');
            if (parentSection) {
                const parent = parentSection.previousElementSibling;
                if (parent && parent.classList.contains('nav-parent')) {
                    // Expand the parent menu
                    parent.classList.remove('collapsed');
                    parentSection.classList.remove('collapsed');
                }
            }
        }
    }
}

// Initialize collapsible navigation with performance optimizations
function initializeCollapsibleNav() {
    // Set initial state
    const isMobile = window.innerWidth <= 767;
    const navParents = document.querySelectorAll('.nav-parent');
    
    navParents.forEach((parent, index) => {
        const children = parent.nextElementSibling;
        if (isMobile || index > 0) {
            parent.classList.add('collapsed');
            if (children && children.classList.contains('nav-children')) {
                children.classList.add('collapsed');
            }
        }
    });
    
    // Use event delegation for better performance
    const navContainer = document.querySelector('.sidebar-nav');
    if (navContainer) {
        navContainer.addEventListener('click', function(e) {
            const navParent = e.target.closest('.nav-parent');
            if (navParent && !e.target.closest('.nav-children')) {
                e.preventDefault();
                e.stopPropagation();
                
                const children = navParent.nextElementSibling;
                navParent.classList.toggle('collapsed');
                if (children) {
                    children.classList.toggle('collapsed');
                }
                
                // Close other sections on desktop only
                if (window.innerWidth > 768) {
                    navParents.forEach(otherParent => {
                        if (otherParent !== navParent) {
                            otherParent.classList.add('collapsed');
                            const otherChildren = otherParent.nextElementSibling;
                            if (otherChildren) {
                                otherChildren.classList.add('collapsed');
                            }
                        }
                    });
                }
                
                // Reinitialize icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
    
    // Optimized resize handler with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isMobile = window.innerWidth <= 767;
            navParents.forEach((parent, index) => {
                const children = parent.nextElementSibling;
                if (isMobile) {
                    parent.classList.add('collapsed');
                    if (children) children.classList.add('collapsed');
                } else {
                    if (index === 0) {
                        parent.classList.remove('collapsed');
                        if (children) children.classList.remove('collapsed');
                    } else {
                        parent.classList.add('collapsed');
                        if (children) children.classList.add('collapsed');
                    }
                }
            });
            
            // Handle sidebar visibility
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                if (isMobile) {
                    sidebar.classList.add('hidden');
                    removeMobileMenuOverlay();
                    document.body.style.overflow = '';
                } else {
                    sidebar.classList.remove('hidden');
                    removeMobileMenuOverlay();
                    document.body.style.overflow = '';
                }
            }
        }, 250);
    });
}

// Initialize header buttons
function initializeHeaderButtons() {
    // Notifications button - DISABLED
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        // Button disabled - no event listener attached
        return;
    }
    
    // Settings button - DISABLED
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        // Button disabled - no event listener attached
        return;
    }
}

// Initialize smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize loading animations
function initializeLoadingAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .welcome-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--success)' : 
                    type === 'error' ? 'var(--danger)' : 'var(--accent)',
        color: 'var(--text-inverse)',
        padding: 'var(--space-4) var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-toast)',
        fontSize: 'var(--font-sm)',
        fontWeight: '500',
        maxWidth: '300px',
        wordWrap: 'break-word',
        transform: 'translateX(100%)',
        transition: 'transform var(--transition-normal)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced loading functions with premium styling
function showLoading(message = 'Analyzing market data...') {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        const messageEl = loading.querySelector('p');
        if (messageEl) {
            messageEl.textContent = message;
        }
        
        // Add premium loading animation
        const spinner = loading.querySelector('.spinner');
        if (spinner) {
            spinner.style.borderTopColor = 'var(--accent)';
            spinner.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        }
    }
}

// Preserve original showLoading for micro-interactions compatibility
window.originalShowLoading = showLoading;

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

// Preserve original hideLoading for micro-interactions compatibility
window.originalHideLoading = hideLoading;

// Enhanced error display with premium styling
function showError(message, container = null) {
    const targetContainer = container || document.getElementById('portfolio-results');
    if (targetContainer) {
        // Check if it's a mock data warning
        if (message.includes('mock data') || message.includes('demo')) {
            targetContainer.innerHTML = `
                <div class="premium-message premium-warning" style="
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
                    border: 1px solid var(--warning);
                    border-left: 4px solid var(--warning);
                    padding: var(--space-6);
                    border-radius: var(--radius-lg);
                    margin: var(--space-6) 0;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="display: flex; align-items: center; gap: var(--space-4);">
                        <div style="
                            width: 48px;
                            height: 48px;
                            background: var(--warning);
                            border-radius: var(--radius-lg);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        ">
                            <i data-lucide="info" style="width: 24px; height: 24px; color: var(--text-inverse);"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 var(--space-2) 0; color: var(--warning); font-weight: 600; font-size: var(--font-lg);">📊 Demo Mode</h4>
                            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">${message}</p>
                            <p style="margin: var(--space-2) 0 0 0; font-size: var(--font-sm); color: var(--text-tertiary);">This is for testing purposes. In production, real market data will be used.</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            targetContainer.innerHTML = `
                <div class="premium-message premium-error" style="
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
                    border: 1px solid var(--danger);
                    border-left: 4px solid var(--danger);
                    padding: var(--space-6);
                    border-radius: var(--radius-lg);
                    margin: var(--space-6) 0;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="display: flex; align-items: center; gap: var(--space-4);">
                        <div style="
                            width: 48px;
                            height: 48px;
                            background: var(--danger);
                            border-radius: var(--radius-lg);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        ">
                            <i data-lucide="alert-circle" style="width: 24px; height: 24px; color: var(--text-inverse);"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 var(--space-2) 0; color: var(--danger); font-weight: 600; font-size: var(--font-lg);">Error</h4>
                            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">${message}</p>
                            <p style="margin: var(--space-2) 0 0 0; font-size: var(--font-sm); color: var(--text-tertiary);">Please check your internet connection and try again.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Stock detail modal with premium enhancements
function closeStockDetail() {
    const modal = document.getElementById('stock-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Remove scroll lock from html element
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        
        // Clean up any inline styles
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        // Force reflow
        void document.body.offsetHeight;
    }
}

// ESC key handler for closing modals
function setupESCKeyHandler() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            const modal = document.getElementById('stock-detail-modal');
            if (modal && modal.style.display === 'flex') {
                closeStockDetail();
            }
        }
    });
}

// Click outside modal to close
function setupModalClickOutsideHandler() {
    const modal = document.getElementById('stock-detail-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeStockDetail();
            }
        });
    }
}

// Enhanced display functions with premium styling
function displayPortfolioResults(data, container) {
    const { buy_stocks, sell_stocks, summary, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    // Premium Summary Statistics
    html += `
        <div class="result-section">
            <h3 style="
                font-size: var(--font-2xl);
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: var(--space-6);
                position: relative;
                padding-bottom: var(--space-3);
            ">
                Portfolio Analysis Summary
                <span style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 60px;
                    height: 3px;
                    background: var(--gradient-accent);
                    border-radius: var(--radius-full);
                "></span>
            </h3>
            <div class="portfolio-summary" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-6);
                margin-bottom: var(--space-8);
            ">
                <div class="summary-card" style="
                    background: var(--gradient-card);
                    padding: var(--space-6);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    border: 1px solid var(--border-primary);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
                    <div class="summary-value" style="
                        font-size: var(--font-3xl);
                        font-weight: 800;
                        color: var(--text-primary);
                        margin-bottom: var(--space-2);
                    ">${summary.total}</div>
                    <div class="summary-label" style="
                        color: var(--text-secondary);
                        font-size: var(--font-sm);
                        font-weight: 500;
                    ">Total Analyzed</div>
                </div>
                <div class="summary-card" style="
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
                    padding: var(--space-6);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    border: 1px solid var(--success);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
                    <div class="summary-value" style="
                        font-size: var(--font-3xl);
                        font-weight: 800;
                        color: var(--success);
                        margin-bottom: var(--space-2);
                    ">${summary.buy_count}</div>
                    <div class="summary-label" style="
                        color: var(--success);
                        font-size: var(--font-sm);
                        font-weight: 600;
                    ">BUY Recommendations</div>
                </div>
                <div class="summary-card" style="
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
                    padding: var(--space-6);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    border: 1px solid var(--danger);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
                    <div class="summary-value" style="
                        font-size: var(--font-3xl);
                        font-weight: 800;
                        color: var(--danger);
                        margin-bottom: var(--space-2);
                    ">${summary.sell_count}</div>
                    <div class="summary-label" style="
                        color: var(--danger);
                        font-size: var(--font-sm);
                        font-weight: 600;
                    ">SELL Recommendations</div>
                </div>
                <div class="summary-card" style="
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
                    padding: var(--space-6);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    border: 1px solid var(--warning);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
                    <div class="summary-value" style="
                        font-size: var(--font-3xl);
                        font-weight: 800;
                        color: var(--warning);
                        margin-bottom: var(--space-2);
                    ">${summary.hold_count}</div>
                    <div class="summary-label" style="
                        color: var(--warning);
                        font-size: var(--font-sm);
                        font-weight: 600;
                    ">HOLD Recommendations</div>
                </div>
                <div class="summary-card" style="
                    background: var(--gradient-card);
                    padding: var(--space-6);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    border: 1px solid var(--border-primary);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-normal);
                " onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
                    <div class="summary-value" style="
                        font-size: var(--font-3xl);
                        font-weight: 800;
                        color: var(--accent);
                        margin-bottom: var(--space-2);
                    ">${summary.avg_score.toFixed(2)}</div>
                    <div class="summary-label" style="
                        color: var(--text-secondary);
                        font-size: var(--font-sm);
                        font-weight: 500;
                    ">Average Score</div>
                </div>
            </div>
        </div>
    `;
    
    // Continue with existing table generation logic...
    // (Rest of the function remains the same but with enhanced styling)
    
    html += '</div>';
    container.innerHTML = html;
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', loadSavedTheme);

// Market data functionality
class MarketDataService {
    constructor() {
        this.updateInterval = null;
        this.isVisible = false;
    }

    fetchSP500Data() {
        return new Promise((resolve) => {
            // Use mock data for browser environment
            const mockData = {
                price: '4,512.58',
                change: '+1.24',
                isPositive: true
            };
            
            // Simulate API delay
            setTimeout(() => {
                resolve(mockData);
            }, 100);
        });
    }

    updateMarketDisplay(data) {
        // Only update the header's market status, not the sidebar
        const headerStatusText = document.querySelector('.header-actions .status-text');
        if (headerStatusText) {
            headerStatusText.innerHTML = `S&P 500: ${data.price} <span class="${data.isPositive ? 'positive' : 'negative'}">${data.change}%</span>`;
        }
    }

    updateMarketData() {
        this.fetchSP500Data().then(data => {
            this.updateMarketDisplay(data);
        });
    }

    show() {
        const marketStatus = document.querySelector('.header-actions .market-status');
        const sidebarStatus = document.querySelector('.sidebar-footer .status-indicator');
        
        if (marketStatus) {
            marketStatus.style.display = 'block';
        }
        if (sidebarStatus) {
            sidebarStatus.style.display = 'flex';
        }
        
        this.isVisible = true;
        this.startUpdates();
    }

    hide() {
        const marketStatus = document.querySelector('.header-actions .market-status');
        const sidebarStatus = document.querySelector('.sidebar-footer .status-indicator');
        
        if (marketStatus) {
            marketStatus.style.display = 'none';
        }
        if (sidebarStatus) {
            sidebarStatus.style.display = 'none';
        }
        
        this.isVisible = false;
        this.stopUpdates();
    }

    startUpdates() {
        // Update immediately
        this.updateMarketData();
        
        // Then update every 5 minutes
        this.updateInterval = setInterval(() => {
            this.updateMarketData();
        }, 5 * 60 * 1000);
    }

    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize market data service
const marketDataService = new MarketDataService();

// Error display
function showError(message, container = null) {
    const targetContainer = container || document.getElementById('portfolio-results');
    if (targetContainer) {
        // Check if it's a mock data warning
        if (message.includes('mock data') || message.includes('demo')) {
            targetContainer.innerHTML = `
                <div class="info-message" style="background: var(--warning-bg); border: 1px solid var(--warning); padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <strong>📊 Demo Mode:</strong> ${message}
                    <br><small>This is for testing purposes. In production, real market data will be used.</small>
                </div>
            `;
        } else {
            targetContainer.innerHTML = `
                <div class="error-message">
                    <strong>Error:</strong> ${message}
                    <br><small>Please check your internet connection and try again.</small>
                </div>
            `;
        }
    }
}

// Display functions (adapted from original main.js)
function displayPortfolioResults(data, container) {
    const { buy_stocks, sell_stocks, summary, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    // Summary Statistics
    html += `
        <div class="result-section">
            <h3>Portfolio Summary</h3>
            <div class="portfolio-summary">
                <div class="summary-card">
                    <div class="summary-value">${summary.total}</div>
                    <div class="summary-label">Total Analyzed</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--success);">${summary.buy_count}</div>
                    <div class="summary-label">BUY Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--danger);">${summary.sell_count}</div>
                    <div class="summary-label">SELL Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--warning);">${summary.hold_count}</div>
                    <div class="summary-label">HOLD Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value">${summary.avg_score.toFixed(2)}</div>
                    <div class="summary-label">Average Score</div>
                </div>
            </div>
        </div>
    `;
    
    // Top BUY Recommendations
    if (buy_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--success);">Top ${buy_stocks.length} BUY Recommendations</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buy_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span></td>
                                    <td class="score-positive">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No BUY recommendations found.</p></div>';
    }
    
    // Top SELL Recommendations
    if (sell_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--danger);">Top ${sell_stocks.length} SELL Recommendations</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sell_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge recommendation-sell">${stock.recommendation}</span></td>
                                    <td class="score-negative">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No SELL recommendations found.</p></div>';
    }
    
    // HOLD Recommendations
    if (data.hold_stocks && data.hold_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--warning);">HOLD Recommendations (${data.hold_stocks.length})</h3>
                <div class="table-wrapper">
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                            <th>Tip</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.hold_stocks.map((stock, idx) => `
                                <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + sell_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + sell_stocks.length + idx})">
                                    <td>${idx + 1}</td>
                                    <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                    </td>
                                    <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                    </td>
                                    <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                        ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                    </td>
                                    <td>${stock.rsi.toFixed(2)}</td>
                                    <td><span class="recommendation-badge recommendation-hold">${stock.recommendation}</span></td>
                                    <td style="color: var(--warning);">${stock.score}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                </div>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No HOLD recommendations found.</p></div>';
    }
    
    // Store all stocks for detail view
    window.allStocks = [...(buy_stocks || []), ...(sell_stocks || []), ...(data.hold_stocks || [])];
    
    // Failed symbols
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.join(', ')}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function displayMarketResults(data, container) {
    const { buy_recommendations, total_analyzed, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    html += `
        <div class="result-section">
            <h3>Top ${buy_recommendations.length} BUY Recommendations</h3>
            <p class="info-text">Analyzed ${total_analyzed} stocks</p>
            <div class="table-wrapper">
            <table class="stocks-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>1D %</th>
                        <th>1W %</th>
                        <th>1M %</th>
                        <th>6M %</th>
                        <th>1Y %</th>
                        <th>RSI</th>
                        <th>Tip</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${buy_recommendations.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                <td>${idx + 1}</td>
                                <td data-company="${stock.company}"><strong>${stock.symbol}</strong></td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-buy">${stock.recommendation}</span></td>
                                <td class="score-positive">${stock.score}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Store stocks for detail view
    window.allStocks = buy_recommendations || [];
    
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.slice(0, 10).join(', ')}${failed_symbols.length > 10 ? '...' : ''}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Stock detail modal
function showStockDetail(symbol, index) {
    const stocks = window.allStocks || [];
    const stock = stocks[index];
    
    if (!stock) return;
    
    const modal = document.getElementById('stock-detail-modal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    const fundamental = stock.fundamental || {};
    
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    
    modalTitle.textContent = `${symbol} - ${stock.company}`;
    
    modalBody.innerHTML = `
        <div class="analysis-container">
            <div class="analysis-section">
                <h3>Technical Analysis</h3>
                <div class="indicators-grid">
                    <div class="indicator-card">
                        <div class="indicator-label">Current Price</div>
                        <div class="indicator-value">$${stock.price.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1D Change</div>
                        <div class="indicator-value ${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1W Change</div>
                        <div class="indicator-value ${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1M Change</div>
                        <div class="indicator-value ${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">6M Change</div>
                        <div class="indicator-value ${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                            ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">1Y Change</div>
                        <div class="indicator-value ${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                            ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">RSI (14)</div>
                        <div class="indicator-value">${stock.rsi.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">MACD</div>
                        <div class="indicator-value">${stock.macd ? stock.macd.toFixed(2) : 'N/A'}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (20)</div>
                        <div class="indicator-value">${stock.sma_20 ? '$' + stock.sma_20.toFixed(2) : 'N/A'}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (50)</div>
                        <div class="indicator-value">${stock.sma_50 ? '$' + stock.sma_50.toFixed(2) : 'N/A'}</div>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <strong>Recommendation:</strong> 
                    <span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span>
                    <strong style="margin-left: 15px;">Score:</strong> 
                    <span class="${stock.score >= 0 ? 'score-positive' : 'score-negative'}">${stock.score}</span>
                </div>
                <h4 style="margin-top: 15px;">Reasoning:</h4>
                <p class="reasoning-text">${stock.reasoning || 'No detailed reasoning available'}</p>
            </div>
        </div>
    `;
}

// Helper functions for styling
function getRecommendationClass(recommendation) {
    if (recommendation.includes('BUY')) return 'recommendation-buy';
    if (recommendation.includes('SELL')) return 'recommendation-sell';
    return 'recommendation-hold';
}

// Form event handlers - Now handled by PageManager.attachEventListeners()
// Note: Page initialization is handled in the DOMContentLoaded listener above
