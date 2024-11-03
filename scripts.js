// Initialize dark mode state as soon as possible
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Unified function to update dark mode state
function updateDarkMode(isDark) {
    const icon = darkModeToggle.querySelector('i');
    
    if (isDark) {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'true');
    } else {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'false');
    }
    updatePDFViewerTheme();
}

// Update PDF viewer theme based on dark mode
function updatePDFViewerTheme() {
    const isDarkMode = body.classList.contains('dark-mode');
    const pdfContainer = document.querySelector('.pdf-viewer-container');
    const examButtons = document.querySelectorAll('.exam-button');

    if (pdfContainer) {
        pdfContainer.style.backgroundColor = isDarkMode ? 'var(--card-bg-dark, #2a2a2a)' : 'var(--card-bg-light, #ffffff)';
    }

    examButtons.forEach(button => {
        if (!button.classList.contains('active')) {
            button.style.backgroundColor = isDarkMode ? 'var(--card-bg-dark, #2a2a2a)' : 'var(--card-bg-light, #ffffff)';
            button.style.color = isDarkMode ? 'var(--text-color-dark, #ffffff)' : 'var(--text-color-light, #333333)';
        }
    });
}

// Main initialization when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode from localStorage
    const savedMode = localStorage.getItem('darkMode');
    updateDarkMode(savedMode === 'true');

    // Header animation
    document.querySelector('header h1').style.animation = 'fadeIn 1.5s ease-in';

    // Set copyright year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Initialize search functionality
    initializeSearch();

    // Initialize category effects
    initializeCategories();

    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Page transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dark mode toggle event listener
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = !body.classList.contains('dark-mode');
    updateDarkMode(isDarkMode);
});

// Search functionality initialization
function initializeSearch() {
    const searchBar = document.getElementById('searchBar');
    if (!searchBar) return;

    let searchTimeout;
    const universityCards = document.querySelectorAll('.university-card');
    const categories = document.querySelectorAll('.category');

    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();

            // Update university cards visibility
            universityCards.forEach(card => {
                const universityName = card.querySelector('.university-name').textContent.toLowerCase();
                const matches = universityName.includes(query);

                card.style.transition = 'all 0.3s ease';
                if (matches) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (!universityName.includes(searchBar.value.toLowerCase().trim())) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });

            // Update categories visibility
            categories.forEach(button => {
                const categoryText = button.textContent.toLowerCase();
                button.style.display = categoryText.includes(query) ? 'inline-block' : 'none';
            });

            // Handle no results message
            updateNoResultsMessage(query, categories);
        }, 300);
    });
}

// PDF viewer functionality
function showPDF(pdfName, button) {
    const buttons = document.querySelectorAll('.exam-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const container = document.querySelector('.pdf-viewer-container');
    container.classList.add('active');

    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = pdfName;

    // Adjust the initial zoom level based on screen size
    const isMobile = window.innerWidth <= 768;
    pdfViewer.scale = isMobile ? 0.5 : 1; // Adjust the initial zoom level as needed

    container.style.opacity = '0';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);

    updatePDFViewerTheme();
}

// Category initialization
function initializeCategories() {
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        // Hover effects
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px)';
            category.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        });

        // Click effects
        category.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Update no results message
function updateNoResultsMessage(query, categories) {
    const noResults = document.getElementById('noResults');
    const visibleCategories = [...categories].filter(cat => 
        cat.style.display !== 'none'
    ).length;

    if (query && visibleCategories === 0) {
        if (!noResults) {
            const message = document.createElement('div');
            message.id = 'noResults';
            message.textContent = 'No matching categories found';
            message.style.animation = 'fadeIn 0.3s ease';
            document.getElementById('searchBar').parentNode.appendChild(message);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.7);
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

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);