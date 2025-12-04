// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize typing effect in terminal
    initTerminalTyping();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
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
            themeIcon.setAttribute('title', 'Switch to light theme');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.setAttribute('title', 'Switch to dark theme');
        }
    }
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Change active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
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

// Smooth Scrolling
function initSmoothScrolling() {
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

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Simulate form submission
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 5000);
    });
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Animate Skill Bars
function initSkillBars() {
    // Only animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Skill bars already have inline width styles
                // This is just to trigger the animation
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Terminal Typing Effect
function initTerminalTyping() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    // Simple typewriter effect on page load
    let delay = 0;
    terminalLines.forEach((line, index) => {
        // Skip the blinking cursor line
        if (line.classList.contains('blink')) return;
        
        const originalText = line.textContent;
        line.textContent = '';
        
        // Only apply typing effect to command lines (not outputs)
        if (originalText.startsWith('>')) {
            setTimeout(() => {
                typeText(line, originalText, 0);
            }, delay);
            
            delay += originalText.length * 30 + 500; // Add delay between lines
        } else {
            // For output lines, just show them after a delay
            setTimeout(() => {
                line.textContent = originalText;
                line.style.opacity = '1';
            }, delay);
            
            delay += 500;
        }
    });
    
    function typeText(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                typeText(element, text, index + 1);
            }, 30);
        }
    }
}

// Additional feature: Project filter by technology
function createProjectFilter() {
    // This would be an additional feature if you had more projects
    // For now, we'll leave it as a placeholder for future enhancement
    console.log('Project filter feature placeholder');
}

// Additional feature: Download resume button
function createDownloadButton() {
    const downloadButton = document.createElement('a');
    downloadButton.href = '#';
    downloadButton.className = 'btn btn-secondary';
    downloadButton.innerHTML = '<i class="fas fa-download"></i> Download Resume';
    
    // Add to hero buttons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.appendChild(downloadButton);
    }
    
    // In a real implementation, this would link to a PDF file
    downloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Resume download would start here. In a real implementation, this would link to a PDF file.');
    });
}

// Initialize additional features
createDownloadButton();
createProjectFilter();

// Profile Picture Upload Functionality
function initProfilePictureUpload() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    const profilePicLarge = document.querySelector('.profile-pic-large');
    
    // Create upload button for profile picture
    const uploadContainer = document.createElement('div');
    uploadContainer.className = 'upload-profile-container';
    uploadContainer.innerHTML = `
        <label for="profile-upload" class="upload-btn">
            <i class="fas fa-camera"></i> Upload Profile Picture
        </label>
        <input type="file" id="profile-upload" accept="image/*">
    `;
    
    // Add to hero section
    const heroContent = document.querySelector('.hero-content');
    heroContent.appendChild(uploadContainer);
    
    const uploadInput = document.getElementById('profile-upload');
    
    uploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                // Update hero profile picture
                profilePlaceholder.innerHTML = '';
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Teofilus Hezron Blaun Profile Picture';
                profilePlaceholder.appendChild(img);
                
                // Update about section profile picture
                if (profilePicLarge) {
                    profilePicLarge.innerHTML = '';
                    const imgLarge = document.createElement('img');
                    imgLarge.src = imageUrl;
                    imgLarge.alt = 'Teofilus Hezron Blaun Profile Picture';
                    profilePicLarge.appendChild(imgLarge);
                }
                
                // Store in localStorage for persistence
                localStorage.setItem('profilePicture', imageUrl);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Check if profile picture exists in localStorage
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        profilePlaceholder.innerHTML = '';
        const img = document.createElement('img');
        img.src = savedProfilePic;
        img.alt = 'Teofilus Hezron Blaun Profile Picture';
        profilePlaceholder.appendChild(img);
        
        if (profilePicLarge) {
            profilePicLarge.innerHTML = '';
            const imgLarge = document.createElement('img');
            imgLarge.src = savedProfilePic;
            imgLarge.alt = 'Teofilus Hezron Blaun Profile Picture';
            profilePicLarge.appendChild(imgLarge);
        }
    }
}

// Update the DOMContentLoaded event listener to include the new function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all existing features
    initTheme();
    initNavigation();
    initSmoothScrolling();
    initBackToTop();
    initContactForm();
    initSkillBars();
    createDownloadButton();
    createProjectFilter();
    
    // Add new profile picture functionality
    initProfilePictureUpload();
    
    // Initialize typing effect for hero description
    initTypewriterEffect();
});

// Add typewriter effect for hero description
function initTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;
    
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}


