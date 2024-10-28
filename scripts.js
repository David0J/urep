window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header h1').style.animation = 'fadeIn 1.5s ease-in';
});
document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(button => {
        const categoryText = button.textContent.toLowerCase();
        if (categoryText.includes(query)) {
            button.style.display = 'inline-block'; // Show matching category
        } else {
            button.style.display = 'none'; // Hide non-matching category
        }
    });
});
       // Dark mode toggle functionality
       const darkModeToggle = document.getElementById('darkModeToggle');
       const body = document.body;

       darkModeToggle.addEventListener('click', () => {
           body.classList.toggle('dark-mode');
           const icon = darkModeToggle.querySelector('i');
           if (body.classList.contains('dark-mode')) {
               icon.classList.remove('fa-moon');
               icon.classList.add('fa-sun');
           } else {
               icon.classList.remove('fa-sun');
               icon.classList.add('fa-moon');
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

       // Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {


    // Enhanced search functionality with debouncing
    let searchTimeout;
    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            
            categories.forEach(button => {
                const categoryText = button.textContent.toLowerCase();
                const matches = categoryText.includes(query);
                
                // Smooth transition for showing/hiding
                button.style.transition = 'all 0.3s ease';
                
                if (matches) {
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                    button.style.display = 'inline-block';
                } else {
                    button.style.opacity = '0';
                    button.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (!categoryText.includes(searchBar.value.toLowerCase().trim())) {
                            button.style.display = 'none';
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
        }, 300); // Debounce delay
    });

    // Add hover effects to categories
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px)';
            category.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        });

        // Add click animation
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

// Add smooth scrolling for anchor links
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

// Add scroll-based animations
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