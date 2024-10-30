window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header h1').style.animation = 'fadeIn 1.5s ease-in';
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const categories = document.querySelectorAll('.category');

    categories.forEach(button => {
        const categoryText = button.textContent.toLowerCase();
        if (categoryText.includes(query)) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
        }
    });
});

// Dark mode toggle functionality with localStorage
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check localStorage on page load and apply saved mode
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('darkMode');
    const icon = darkModeToggle.querySelector('i');
    
    if (savedMode === 'true') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'true');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'false');
    }
});

// Category button click animation
const categories = document.querySelectorAll('.category');
categories.forEach(category => {
    category.addEventListener('click', () => {
        category.style.transform = 'scale(0.95)';
        setTimeout(() => {
            category.style.transform = 'scale(1)';
        }, 200);
    });
});

// Enhanced search functionality with debouncing
document.addEventListener('DOMContentLoaded', () => {
    let searchTimeout;
    const searchBar = document.getElementById('searchBar');
    const universityCards = document.querySelectorAll('.university-card');

    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();

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


            // No results found message
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
                    searchBar.parentNode.appendChild(message);
                }
            } else if (noResults) {
                noResults.remove();
            }
        }, 300);
    });

    // Category hover and click effects
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px)';
            category.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        });

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
});

// Smooth scrolling for anchor links
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

// Scroll-based animations
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

function goBack() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.history.back();
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function showPDF(pdfName, button) {
    document.querySelectorAll('.exam-button').forEach(btn => {
        btn.classList.remove('active');
    });

    button.classList.add('active');

    const container = document.querySelector('.pdf-viewer-container');
    container.classList.add('active');

    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = `${pdfName}`;

    // Smooth scroll to PDF viewer
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Add fade-in animation
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
}

// Add this to handle dark mode for PDF viewer
function updatePDFViewerTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const pdfContainer = document.querySelector('.pdf-viewer-container');
    if (pdfContainer) {
        if (isDarkMode) {
            pdfContainer.style.background = 'var(--card-bg-dark, #2a2a2a)';
        } else {
            pdfContainer.style.background = 'var(--card-bg-light, #ffffff)';
        }
    }
}

// Add this to your existing dark mode toggle function
document.getElementById('darkModeToggle').addEventListener('click', () => {
    // Your existing dark mode toggle code
    updatePDFViewerTheme();
});