// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initSkillAnimations();
    initBackToTop();
    initProfileImage();
    initTypewriterEffect();
    initActiveNav();
    initDownloadResume();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Style the button
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Profile Image Handling
function initProfileImage() {
    const profileImg = document.getElementById('profile-image');
    
    // Fallback if image doesn't load
    profileImg.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder-square';
        placeholder.innerHTML = '<i class="fas fa-user-tie"></i>';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            font-size: 5rem;
        `;
        this.parentNode.appendChild(placeholder);
    };
}

// Typewriter Effect for Hero Text
function initTypewriterEffect() {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const speed = 30; // typing speed in ms
    
    function typeWriter() {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 500);
}

// Active Navigation Highlight
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Download Resume Button
function initDownloadResume() {
    const downloadBtn = document.querySelector('a[href="#contact"]');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('In a real implementation, this would download a PDF resume. For now, please contact via email.');
    });
}
