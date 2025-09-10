// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        });
    });
});

// Typing animation for hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '2px solid #00ffff';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Parallax effect for background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const matrixBg = document.querySelector('.matrix-bg');
    if (matrixBg) {
        matrixBg.style.transform = `translateY(${rate}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-category')) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach((fill, index) => {
                    setTimeout(() => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-card, .stat-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'MESSAGE SENT!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 2000);
            
            // In a real implementation, you would send the data to a server
            console.log('Form submitted:', { name, email, message });
        });
    }
});

// Matrix rain effect (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-3';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Initialize matrix rain effect
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the next line to enable matrix rain effect
    // createMatrixRain();
});

// Glitch effect trigger
function triggerGlitch(element) {
    element.classList.add('glitch-active');
    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, 500);
}

// Add glitch effect to random elements occasionally
document.addEventListener('DOMContentLoaded', function() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    function randomGlitch() {
        if (Math.random() > 0.95) {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            triggerGlitch(randomElement);
        }
    }
    
    setInterval(randomGlitch, 1000);
});

// Cursor trail effect
document.addEventListener('DOMContentLoaded', function() {
    const cursorTrail = [];
    const trailLength = 20;
    
    function createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(dot);
        cursorTrail.push(dot);
        
        if (cursorTrail.length > trailLength) {
            const oldDot = cursorTrail.shift();
            oldDot.remove();
        }
        
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
        }, 100);
    }
    
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.7) { // Only create trail dots occasionally
            createTrailDot(e.clientX, e.clientY);
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .glitch-active {
        animation: intensive-glitch 0.5s ease-in-out;
    }
    
    @keyframes intensive-glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    .cursor-trail {
        box-shadow: 0 0 10px #00ffff;
    }
`;
document.head.appendChild(style);
