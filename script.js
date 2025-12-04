// Portfolio Website JavaScript with Matrix Rain
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMatrixRain();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initSkillAnimations();
    initBackToTop();
    initProfileImage();
    initTerminalTyping();
    initActiveNav();
    initProjectHover();
    initEducationTimeline();
});

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters
    const matrix = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black rectangle for trail effect
        ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#8a2be2'; // Purple color for rain
        ctx.font = `${fontSize}px 'Source Code Pro', monospace`;
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move drop down
            drops[i]++;
            
            // Add random reset
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }
    
    // Animation loop
    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = canvas.width / fontSize;
        if (newColumns > drops.length) {
            // Add new drops
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
            }
        } else {
            // Remove extra drops
            drops.length = newColumns;
        }
    });
    
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.setAttribute('title', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.setAttribute('title', 'Switch to dark mode');
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
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
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
                // Close mobile menu if open
                const menuToggle = document.querySelector('.menu-toggle');
                const navMenu = document.querySelector('.nav-menu');
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Smooth scroll
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
        showMessage('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 5000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') + '%';
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
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
        background: var(--gradient-purple);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-glow);
    `;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        if (window.scrollY > 500) {
            backToTop.style.transform = 'translateY(0)';
        }
    });
}

// Profile Image Handling
function initProfileImage() {
    const profileImg = document.getElementById('profile-image');
    
    // Fallback if image doesn't load
    profileImg.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder';
        placeholder.innerHTML = '<i class="fas fa-user-tie"></i>';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gradient-purple);
            color: white;
            font-size: 5rem;
        `;
        this.parentNode.appendChild(placeholder);
    };
}

// Terminal Typing Effect
function initTerminalTyping() {
    const terminalLines = document.querySelectorAll('.terminal-body p');
    if (terminalLines.length === 0) return;
    
    // Store original text
    const originalTexts = [];
    terminalLines.forEach(line => {
        originalTexts.push(line.innerHTML);
        line.innerHTML = '';
    });
    
    let lineIndex = 0;
    let charIndex = 0;
    const speed = 30;
    
    function typeWriter() {
        if (lineIndex < terminalLines.length) {
            const currentLine = terminalLines[lineIndex];
            const currentText = originalTexts[lineIndex];
            
            if (charIndex < currentText.length) {
                currentLine.innerHTML += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, speed);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 500);
            }
        }
    }
    
    // Start typing after delay
    setTimeout(typeWriter, 1000);
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
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary-purple)';
            } else {
                link.style.color = '';
            }
        });
    });
}

// Project Card Hover Effects
function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const glow = card.querySelector('.project-glow');
            if (glow) {
                glow.style.opacity = '0.1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.project-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// Education Timeline Animation
function initEducationTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// Handle window load
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Update copyright year
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
});

// Parallax effect for background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});
