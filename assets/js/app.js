// PS Testing LABTech - Main JavaScript File
const data = {
    heroImages: [
        'https://unsplash.it/1200/800?image=100',
        'assets/images/hero1.jpg',
        'assets/images/hero2.jpg',
        'assets/images/hero3.jpg',
      ],
}
// Global variables
let heroIndex = 0;
let mobileMenuBtn, mainNav, contactForm, tabContents, navLinks, dropdowns;
let currentTab = 'home';
let isAnimating = false;
let observerInitialized = false;
let countersAnimated = false;
let counterObserver = null;


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    initializePageLoad();
    initializeElements();
    initializeAnimations();
    initHeroCarousel();
    // initializeNavigation();
    initializeMobileMenu();
    // initializeContactForm();
    initializeDropdowns();
    initializeScrollEffects();
    initializeCounters();
    initializeTypewriter();
    initializeButtons();
    initializeInteractiveCards();

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Toggle hamburger icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Service card interactions with smooth transitions
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                // Add a small delay for the animation to complete
                setTimeout(() => {
                    window.location.href = link;
                }, 100);
            }
        });

        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation and enhancement
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Show success message (in real implementation, you would send the form data)
            showAlert('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testing-service-item, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Back to top button
    const backToTopButton = createBackToTopButton();
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Search functionality (if search box exists)
    const searchBox = document.querySelector('#search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.testing-service-item, .service-card');

            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 500);
    }
});
// Utility functions

// ===========================================================
//  HERO CAROUSEL
// ===========================================================
function initHeroCarousel() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    hero.style.backgroundImage = `url('${data.heroImages[0]}')`;
    setInterval(() => {
      heroIndex = (heroIndex + 1) % data.heroImages.length;
      hero.style.backgroundImage = `url('${data.heroImages[heroIndex]}')`;
    }, 4000);
  }
  
// Initialize interactive service cards
function initializeInteractiveCards() {
    console.log('[PILT LABTech] Initializing interactive service cards...');
    
    const interactiveCards = document.querySelectorAll('.interactive-service-card');
    
    interactiveCards.forEach(card => {
        const cardBtn = card.querySelector('.card-btn');
        const tabId = card.getAttribute('data-tab');
        
        // Handle card click
        card.addEventListener('click', function(e) {
            if (e.target === cardBtn) {
                e.stopPropagation();
                return;
            }
            
            console.log(`[PILT LABTech] Interactive card clicked: ${tabId}`);
            
            if (tabId) {
                showTab(tabId);
            }
        });
        
        // Handle button click
        if (cardBtn) {
            cardBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log(`[PILT LABTech] Card button clicked: ${tabId}`);
                
                if (tabId) {
                    showTab(tabId);
                }
            });
        }
        
        // Add smooth hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize buttons functionality
function initializeButtons() {
    console.log('[PILT LABTech] Initializing button functionality...');
    
    // Get Started Today button
    // const getStartedBtn = document.querySelector('.pulse-button');
    // if (getStartedBtn) {
    //     getStartedBtn.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         console.log('[PILT LABTech] Get Started button clicked');
    //         showTab('contact');
    //     });
    // }
    
    // Service card clicks
    const serviceCards = document.querySelectorAll('.service-card[data-tab]');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                console.log(`[PILT LABTech] Service card clicked: ${tabId}`);
                showTab(tabId);
            }
        });
    });
    
    // Dynamic button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.pulse-button') && e.target.textContent.includes('Contact Us Today')) {
            e.preventDefault();
            showTab('contact');
        }
    });
}

// Page Load Animation System
function initializePageLoad() {
    console.log('[PILT LABTech] Initializing page load animations...');
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        document.body.classList.add('page-loading');
    }
}

function hideLoadingOverlay() {
    console.log('[PILT LABTech] Hiding loading overlay...');
    const loadingOverlay = document.getElementById('loading-overlay');
    const body = document.body;
    
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
        
        setTimeout(() => {
            body.classList.remove('page-loading');
            animateNavigationItems();
            
            // Initialize counter animations when page loads
            setTimeout(() => {
                setupCounterObserver();
            }, 1000);
            
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 500);
        }, 300);
    }
}

// Enhanced Tab Switching with Animations
function showTab(tabId) {
    if (isAnimating || tabId === currentTab) return;
    
    console.log(`[PILT LABTech] Showing tab: ${tabId}`);
    isAnimating = true;
    
    const currentTabElement = document.querySelector('.tab-content.active, .service-tabs.active');
    if (currentTabElement) {
        currentTabElement.classList.add('fade-out');
        
        setTimeout(() => {
            currentTabElement.classList.remove('active', 'fade-out');
            currentTabElement.style.display = 'none';
            // showNewTab(tabId);
        }, 300);
    } else {
        showNewTab(tabId);
    }
}

function showNewTab(tabId) {
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    const serviceContainer = document.querySelector('.service-tabs');
    if (serviceContainer) {
        serviceContainer.classList.remove('active');
        serviceContainer.style.display = 'none';
    }
    
    // updatePageTitle(tabId);
    
    // if (serviceData[tabId]) {
    //     showServicePage(tabId);
    // } else {
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.style.display = 'block';
            setTimeout(() => {
                targetTab.classList.add('active');
                
                if (observerInitialized) {
                    initializeTabAnimations(targetTab);
                }
                
                // Reset and setup counters if returning to home tab
                if (tabId === 'home') {
                    countersAnimated = false;
                    setTimeout(() => {
                        setupCounterObserver();
                    }, 500);
                }
                
                isAnimating = false;
            }, 50);
        } else {
            isAnimating = false;
        }
    // }
    
    currentTab = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Initialize DOM elements
function initializeElements() {
    console.log('[PILT LABTech] Getting DOM elements...');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mainNav = document.getElementById('main-nav');
    contactForm = document.getElementById('contact-form');
    tabContents = document.querySelectorAll('.tab-content');
    navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    dropdowns = document.querySelectorAll('.dropdown');
    
    console.log('[PILT LABTech] DOM elements retrieved successfully');
    console.log('[PILT LABTech] Mobile menu button found:', !!mobileMenuBtn);
    console.log('[PILT LABTech] Main nav found:', !!mainNav);
}

// Counter Animation System
function initializeCounters() {
    console.log('[PILT LABTech] initializeCounters function called');
}

function setupCounterObserver() {
    console.log('[PILT LABTech] Setting up counter observer...');
    
    const statisticsSection = document.getElementById('statistics-section');
    if (!statisticsSection) {
        console.warn('[PILT LABTech] Statistics section not found');
        return;
    }
    
    // Reset counters to 0 initially
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
    
    if (!window.IntersectionObserver) {
        console.warn('[PILT LABTech] IntersectionObserver not supported, starting counters immediately');
        setTimeout(() => triggerCounterAnimations(), 500);
        return;
    }
    
    counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                console.log('[PILT LABTech] Statistics section visible, starting counter animations');
                triggerCounterAnimations();
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    counterObserver.observe(statisticsSection);
    console.log('[PILT LABTech] Counter observer setup complete');
}

function triggerCounterAnimations() {
    if (countersAnimated) {
        console.log('[PILT LABTech] Counters already animated');
        return;
    }
    
    console.log('[PILT LABTech] Starting counter animations...');
    countersAnimated = true;
    
    const counters = document.querySelectorAll('.counter');
    console.log(`[PILT LABTech] Found ${counters.length} counters to animate`);
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        
        console.log(`[PILT LABTech] Counter ${index + 1}: target=${target}, duration=${duration}ms`);
        
        setTimeout(() => {
            animateCounter(counter, target, duration);
        }, index * 300);
    });
}

function animateCounter(element, target, duration) {
    if (!element || !target) {
        console.error('[PILT LABTech] Invalid counter element or target');
        return;
    }
    
    console.log(`[PILT LABTech] Starting animation for counter: ${target} over ${duration}ms`);
    
    let current = 0;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * easeOutCubic);
        
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
            console.log(`[PILT LABTech] Counter animation completed: ${target}`);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Animation System
function initializeAnimations() {
    console.log('[PILT LABTech] Initializing animation system...');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-slide-up, .animate-service-card, .animate-benefit, .animate-contact-item');
        animatedElements.forEach(el => observer.observe(el));
        
        observerInitialized = true;
        console.log('[PILT LABTech] Animation observer initialized');
    }
}

// Staggered Navigation Animation
function animateNavigationItems() {
    console.log('[PILT LABTech] Animating navigation items...');
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Typewriter Effect
function initializeTypewriter() {
    console.log('[PILT LABTech] Initializing typewriter effects...');
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        const text = element.dataset.text || element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    });
}

// Navigation functionality
function initializeNavigation() {
    console.log('[PILT LABTech] Initializing navigation...');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tabId = this.getAttribute('data-tab');
            if (tabId && !isAnimating) {
                console.log(`[PILT LABTech] Navigating to tab: ${tabId}`);
                showTab(tabId);
                updateActiveNavLink(this);
                
                if (mainNav && mainNav.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                closeAllDropdowns();
            }
        });
        
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('dropdown-toggle')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('dropdown-toggle')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Fixed Mobile Menu functionality
function initializeMobileMenu() {
    console.log('[PILT LABTech] Initializing mobile menu...');
    
    if (mobileMenuBtn && mainNav) {
        console.log('[PILT LABTech] Mobile menu elements found, setting up event listeners...');
        
        // Remove any existing event listeners
        const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
        mobileMenuBtn = newMobileMenuBtn;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('[PILT LABTech] Mobile menu button clicked');
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav && mainNav.classList.contains('active') && !e.target.closest('.header')) {
                console.log('[PILT LABTech] Clicking outside mobile menu, closing it');
                toggleMobileMenu();
            }
        });
        
        console.log('[PILT LABTech] Mobile menu initialized successfully');
    } else {
        console.warn('[PILT LABTech] Mobile menu elements not found:', {
            mobileMenuBtn: !!mobileMenuBtn,
            mainNav: !!mainNav
        });
    }
}

function toggleMobileMenu() {
    if (!mainNav || !mobileMenuBtn) {
        console.warn('[PILT LABTech] Cannot toggle mobile menu - elements missing');
        return;
    }
    
    const isActive = mainNav.classList.contains('active');
    console.log(`[PILT LABTech] Toggling mobile menu. Currently active: ${isActive}`);
    
    if (isActive) {
        // Closing menu
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        closeAllDropdowns();
        console.log('[PILT LABTech] Mobile menu closed');
    } else {
        // Opening menu
        mainNav.classList.add('active');
        mobileMenuBtn.classList.add('active');
        console.log('[PILT LABTech] Mobile menu opened');
        
        // Animate menu items with a slight delay to ensure visibility
        setTimeout(() => {
            const navItems = mainNav.querySelectorAll('.nav-item');
            console.log(`[PILT LABTech] Animating ${navItems.length} navigation items`);
            
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }, 50);
    }
}

// Dropdown functionality
function initializeDropdowns() {
    if (!dropdowns) return;
    
    console.log(`[PILT LABTech] Initializing ${dropdowns.length} dropdowns...`);
    
    dropdowns.forEach((dropdown, index) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Mobile dropdown handling
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`[PILT LABTech] Mobile dropdown ${index + 1} clicked`);
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                    
                    if (dropdown.classList.contains('active')) {
                        const dropdownItems = menu.querySelectorAll('li');
                        dropdownItems.forEach((item, itemIndex) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(-20px)';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 50);
                        });
                    }
                }
            });
            
            // Desktop hover handling
            if (window.innerWidth > 900) {
                dropdown.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
            }
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
}

function closeAllDropdowns() {
    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < hero.offsetHeight) {
            const parallaxOffset = scrollTop * 0.5;
            hero.style.transform = `translateY(${parallaxOffset}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleResponsive() {
    if (window.innerWidth > 900 && mainNav && mainNav.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    closeAllDropdowns();
    
    setTimeout(() => {
        initializeDropdowns();
    }, 100);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');

    // Remove existing error styling
    field.classList.remove('error');

    if (fieldName === 'email' && value && !isValidEmail(value)) {
        field.classList.add('error');
        return false;
    }

    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }

    return true;
}

function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    if (type === 'success') {
        alert.style.backgroundColor = '#617742';
    } else {
        alert.style.backgroundColor = '#dc3545';
    }

    document.body.appendChild(alert);

    // Animate in
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 5000);
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #247194;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#617742';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#247194';
        this.style.transform = 'scale(1)';
    });

    return button;
}

// Add CSS for ripple effect and error styling
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    .alert {
        animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
