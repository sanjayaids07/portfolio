'use strict';

// Initialize EmailJS with your Public Key
(function () {
    emailjs.init("ib5SejoNe5c66J52K");
})();


// LOADING SCREEN


window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});


// TYPING ANIMATION


const typingText = document.getElementById('typingText');
const roles = [
    'Full Stack Developer',
    'MERN Stacker',
    'React Developer',
    'Node.js Developer',
    'Backend Engineer',
    'Frontend Developer',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1000);


// NAVIGATION - STICKY & ACTIVE LINKS


const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveNavLink();
});

function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


// MOBILE NAVIGATION TOGGLE


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});


// SMOOTH SCROLLING


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// SCROLL ANIMATIONS


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .contact-item, .highlight-item'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(el);
});


// BACK TO TOP BUTTON


const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// CONTACT FORM HANDLING (EMAILJS)


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.btn-submit');
    const originalHTML = submitButton.innerHTML;

    const formData = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    emailjs.send(
        "service_ufe46tk",
        "template_qi3bgaf",
        formData
    )
    .then(() => {
        showNotification('Message sent successfully! 🚀', 'success');
        contactForm.reset();
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        showNotification('Failed to send message. Try again.', 'error');
    })
    .finally(() => {
        submitButton.innerHTML = originalHTML;
        submitButton.disabled = false;
    });
});


// NOTIFICATION SYSTEM


function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content ${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: -400px;
            z-index: 10000;
            animation: slideInRight 0.4s ease forwards;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.2rem 1.8rem;
            background: rgba(17, 17, 17, 0.95);
            border-radius: 12px;
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            min-width: 320px;
        }
        .notification-content.success { border-left: 4px solid #10b981; }
        .notification-content.success i { color: #10b981; }
        .notification-content.error { border-left: 4px solid #ef4444; }
        .notification-content.error i { color: #ef4444; }
        .notification-content i { font-size: 1.5rem; }
        @keyframes slideInRight {
            from { right: -400px; }
            to { right: 30px; }
        }
        @keyframes slideOutRight {
            from { right: 30px; }
            to { right: -400px; }
        }
    `;

    if (!document.getElementById('notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}


// DOWNLOAD RESUME


const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Resume download will be available soon!', 'success');
});


// SKILL CARDS ANIMATION


const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});


// PROJECT CARDS HOVER PARALLAX


const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});


// PROJECT LINKS DATA


const projects = [
    {
        name: 'Travelling Website',
        liveUrl: 'https://ddholidays.netlify.app',
        githubUrl: 'https://github.com/sanjayaids07/Traveling-page'
    },
    {
        name: 'PCDP App',
        liveUrl: 'https://pcdp.netlify.app',
        githubUrl: 'https://github.com/sanjayaids07/pcdp'
    },
    {
        name: 'Netflix Clone',
        liveUrl: 'https://netmirror848514.netlify.app',
        githubUrl: 'https://github.com/sanjayaids07/NETFLIX_CLONE'
    }
];

// Helper: safely apply href, target, rel to an anchor
function applyLink(anchor, url) {
    if (!anchor || !url) return;
    anchor.href   = url;
    anchor.target = '_blank';
    anchor.rel    = 'noopener noreferrer';
}

// Inject links into every project card — works with any button style
document.querySelectorAll('.project-card').forEach((card, index) => {
    const project = projects[index];
    if (!project) return;

    const allLinks = card.querySelectorAll('a');

    // 1. Try named class / attribute selectors first
    const githubBtn = card.querySelector(
        'a.btn-github, a.project-github, a[data-github], a[title="GitHub"], a[aria-label="GitHub"]'
    );
    const liveBtn = card.querySelector(
        'a.btn-live, a.project-live, a[data-live], a[title="Live Demo"], a[aria-label="Live Demo"], a[title="Live"], a[aria-label="Live"]'
    );

    if (githubBtn || liveBtn) {
        applyLink(githubBtn, project.githubUrl);
        applyLink(liveBtn,   project.liveUrl);
    } else if (allLinks.length >= 2) {
        // 2. Positional fallback — icon-only buttons: 1st = GitHub, 2nd = Live
        applyLink(allLinks[0], project.githubUrl);
        applyLink(allLinks[1], project.liveUrl);
    } else if (allLinks.length === 1) {
        // 3. Single link — treat as live site
        applyLink(allLinks[0], project.liveUrl);
    }

    console.log('%c\u2705 ' + project.name + ' links injected', 'color: #10b981; font-weight: bold;');
    console.log('   \ud83d\udc19 GitHub: ' + project.githubUrl);
    console.log('   \ud83c\udf10 Live:   ' + project.liveUrl);
});


// CURSOR TRAIL EFFECT


const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

const cursorStyles = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10001;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.15s ease;
    }
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower { display: none; }
    }
`;

const cursorStyleElement = document.createElement('style');
cursorStyleElement.textContent = cursorStyles;
document.head.appendChild(cursorStyleElement);

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;

    setTimeout(() => {
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    }, 50);
});

const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});


// DYNAMIC YEAR IN FOOTER


const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p:first-child');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Sanjay S. All rights reserved.`;
}


// PERFORMANCE OPTIMIZATION


function debounce(func, wait = 10) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);


// KEYBOARD NAVIGATION


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (e.key === 'End' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});


// BUTTON RIPPLE EFFECT


const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const rippleStyles = `
    .ripple-effect {
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
`;

const rippleStyleElement = document.createElement('style');
rippleStyleElement.textContent = rippleStyles;
document.head.appendChild(rippleStyleElement);


// ANALYTICS & TRACKING


function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

document.querySelectorAll('.social-link, .social-btn').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.getAttribute('aria-label') || 'Social';
        trackEvent('Social', 'Click', platform);
    });
});


// ERROR HANDLING


window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});


// CONSOLE ART & MESSAGE


console.log('%c👋 Welcome to My Portfolio!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped by Sanjay S', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%cFull Stack Developer | MERN Stack Specialist', 'color: #ec4899; font-size: 14px;');
console.log('%c💼 Looking to hire? Let\'s connect!', 'color: #10b981; font-size: 14px;');
console.log('%c📧 Email: sanjayclg2007@gmail.com', 'color: #06b6d4; font-size: 12px;');
console.log('%c🔗 GitHub: github.com/sanjayaids07', 'color: #6e40c9; font-size: 12px;');
console.log('%c🌐 Netflix Clone: netmirror848514.netlify.app', 'color: #e50914; font-size: 12px;');
console.log('%c🌐 Travel Site: ddholidays.netlify.app', 'color: #00b4d8; font-size: 12px;');
console.log('%c🌐 PCDP App: pcdp.netlify.app', 'color: #8b5cf6; font-size: 12px;');


// INITIALIZATION COMPLETE


console.log('%c✅ Portfolio initialized successfully!', 'color: #10b981; font-size: 14px; font-weight: bold;');

console.log('Loaded features:', [
    '✓ Typing Animation',
    '✓ Smooth Scrolling',
    '✓ Mobile Navigation',
    '✓ Scroll Animations',
    '✓ EmailJS Contact Form',
    '✓ Custom Cursor',
    '✓ Ripple Effects',
    '✓ Notifications',
    '✓ Project Links Updated'
].join('\n'));
