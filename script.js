// DOM Elements
const faqItems = document.querySelectorAll('.faq-item');
const leadForm = document.getElementById('leadForm');
const videoPlaceholder = document.querySelector('.video-placeholder');

// Create scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Advanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.counters = [];
        this.progressBars = [];
        this.init();
    }

    init() {
        this.setupScrollObserver();
        this.setupParallax();
        this.setupCounters();
        this.setupProgressBars();
        this.setupScrollProgress();
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Add animation classes to elements
        document.querySelectorAll('.authority-item').forEach((el, index) => {
            el.classList.add('scroll-animate', 'fade-up', `stagger-${(index % 6) + 1}`);
        });

        document.querySelectorAll('.differential-item').forEach((el, index) => {
            el.classList.add('scroll-animate', 'fade-scale', `stagger-${(index % 6) + 1}`);
        });

        document.querySelectorAll('.product-card').forEach((el, index) => {
            el.classList.add('scroll-animate', 'fade-up', `stagger-${(index % 3) + 1}`, 'enhanced-hover', 'card-3d');
            const inner = document.createElement('div');
            inner.className = 'card-3d-inner';
            while (el.firstChild) {
                inner.appendChild(el.firstChild);
            }
            el.appendChild(inner);
        });

        document.querySelectorAll('.testimonial-card').forEach((el, index) => {
            el.classList.add('scroll-animate', 'fade-left', `stagger-${(index % 3) + 1}`, 'enhanced-hover');
        });

        // Add reveal animation to section titles
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('scroll-animate', 'reveal-text');
        });

        // Add highlight animation to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const highlights = heroTitle.querySelectorAll('.highlight');
            highlights.forEach(highlight => {
                highlight.classList.add('highlight-animate');
            });
        }

        // Add enhanced effects to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.classList.add('magnetic-btn', 'ripple', 'glow-effect');
        });

        // Add pulse effect to WhatsApp button
        document.querySelectorAll('.whatsapp-btn, .whatsapp-float a').forEach(btn => {
            btn.classList.add('fab-pulse');
        });
    }

    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger reveal animation for text
                    if (entry.target.classList.contains('reveal-text')) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, 200);
                    }

                    // Trigger highlight animation
                    const highlights = entry.target.querySelectorAll('.highlight-animate');
                    highlights.forEach((highlight, index) => {
                        setTimeout(() => {
                            highlight.classList.add('animate');
                        }, 500 + (index * 200));
                    });

                    // Trigger counter animation
                    if (entry.target.classList.contains('counter-section')) {
                        this.animateCounters();
                    }

                    // Trigger progress bar animation
                    if (entry.target.classList.contains('progress-section')) {
                        this.animateProgressBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate').forEach(el => {
            this.observer.observe(el);
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });

            // Hero parallax effect
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroOffset = scrolled * 0.3;
                hero.style.transform = `translateY(${heroOffset}px)`;
            }

            // Floating elements parallax
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrolled * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCounters() {
        // Add counter functionality to urgency stats
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.classList.add('counter');
            stat.dataset.target = stat.textContent;
        });

        // Mark urgency section for counter animation
        const urgencySection = document.querySelector('.urgency-section');
        if (urgencySection) {
            urgencySection.classList.add('counter-section');
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            counter.classList.add('counting');

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    setupProgressBars() {
        // Add progress bars to authority items
        document.querySelectorAll('.authority-item').forEach((item, index) => {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.setProperty('--progress-width', `${85 + (index * 5)}%`);
            
            progressBar.appendChild(progressFill);
            item.appendChild(progressBar);
        });

        // Mark authority section for progress animation
        const authoritySection = document.querySelector('.authority');
        if (authoritySection) {
            authoritySection.classList.add('progress-section');
        }
    }

    animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        progressFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.classList.add('animate');
            }, index * 200);
        });
    }

    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Enhanced Mouse Tracking for Magnetic Effects
class MouseTracker {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.updateMagneticElements(e);
            this.updateParallaxElements(e);
        });
    }

    updateMagneticElements(e) {
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        
        magneticElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            if (this.isNear(e.clientX, e.clientY, rect)) {
                el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            } else {
                el.style.transform = 'translate(0px, 0px) scale(1)';
            }
        });
    }

    updateParallaxElements(e) {
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.02;
            const deltaY = (e.clientY - centerY) * 0.02;
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }

    isNear(x, y, rect) {
        const threshold = 100;
        return (
            x >= rect.left - threshold &&
            x <= rect.right + threshold &&
            y >= rect.top - threshold &&
            y <= rect.bottom + threshold
        );
    }
}

// Initialize mouse tracker
const mouseTracker = new MouseTracker();

// Enhanced Typing Effect
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.element.classList.add('typing-text');
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            setTimeout(() => {
                this.element.classList.remove('typing-text');
            }, 1000);
        }
    }
}

// Apply typing effect to hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    setTimeout(() => {
        const typingEffect = new TypingEffect(heroSubtitle, originalText, 50);
        typingEffect.start();
    }, 1000);
}

// FAQ Functionality with Enhanced Animations
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items with animation
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Enhanced Form Submission with Animations
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(leadForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state with animation
    const submitBtn = leadForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO';
    submitBtn.classList.add('loading-dots', 'shimmer');
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission
        await simulateFormSubmission(data);
        
        // Success animation
        submitBtn.classList.remove('loading-dots', 'shimmer');
        submitBtn.textContent = '✅ ENVIADO!';
        submitBtn.style.background = '#28a745';
        
        // Show success message with animation
        showSuccessMessage();
        leadForm.reset();
        
        // Redirect to WhatsApp
        const whatsappMessage = encodeURIComponent(
            `Olá! Acabei de preencher o formulário no site e gostaria de agendar minha consultoria gratuita para ${data.produto}. Meu nome é ${data.nome}.`
        );
        setTimeout(() => {
            window.open(`https://wa.me/5547986455858?text=${whatsappMessage}`, '_blank');
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showErrorMessage();
    } finally {
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.classList.remove('loading-dots', 'shimmer');
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Dados do formulário:', data);
            resolve();
        }, 2000);
    });
}

// Enhanced Success message with animations
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message scroll-animate fade-scale';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #FF4500, #FF6B35);
            color: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: fadeInScale 0.5s ease-out forwards;
        ">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
            <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Formulário enviado com sucesso!</h3>
            <p style="margin-bottom: 15px; opacity: 0.9;">Você será redirecionado para o WhatsApp para agendar sua consultoria gratuita.</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">Nossa equipe entrará em contato em até 2 horas.</p>
            <div class="progress-bar" style="margin-top: 20px;">
                <div class="progress-fill animate" style="--progress-width: 100%;"></div>
            </div>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            animation: fadeInUp 0.3s ease-out;
        "></div>
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.classList.add('animate-in');
    }, 100);
    
    setTimeout(() => {
        message.style.animation = 'fadeInScale 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 4000);
}

// Enhanced Error message
function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message scroll-animate fade-scale';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: fadeInScale 0.5s ease-out;
        ">
            <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
            <h3 style="margin-bottom: 15px;">Erro ao enviar formulário</h3>
            <p style="margin-bottom: 15px;">Tente novamente ou entre em contato pelo WhatsApp.</p>
            <a href="https://wa.me/5547986455858" target="_blank" style="
                color: white;
                text-decoration: underline;
                font-weight: bold;
            " class="magnetic-btn">(47) 98645-5858</a>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
        "></div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 4000);
}

// Video placeholder with enhanced interaction
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        videoPlaceholder.classList.add('shimmer');
        setTimeout(() => {
            alert('Vídeo em breve! Entre em contato pelo WhatsApp para conhecer nossa loja.');
            videoPlaceholder.classList.remove('shimmer');
        }, 1000);
    });
}

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Phone number formatting with animation
const phoneInput = document.getElementById('whatsapp');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
        
        // Add animation feedback
        e.target.style.transform = 'scale(1.02)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    });
}

// Enhanced header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
        header.style.opacity = '0.95';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }
    
    // Add blur effect when scrolling
    if (scrollTop > 50) {
        header.style.backdropFilter = 'blur(20px)';
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.backdropFilter = 'blur(10px)';
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScrollTop = scrollTop;
});

// Dynamic urgency stats with animation
function updateUrgencyStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 3) {
        const availableSlots = Math.floor(Math.random() * 5) + 1;
        const weekProgress = Math.floor(Math.random() * 30) + 60;
        const recentBookings = Math.floor(Math.random() * 5) + 5;
        
        // Animate number changes
        [availableSlots, weekProgress, recentBookings].forEach((newValue, index) => {
            if (stats[index]) {
                stats[index].style.transform = 'scale(1.2)';
                stats[index].style.color = '#FFD700';
                
                setTimeout(() => {
                    stats[index].textContent = index === 1 ? newValue + '%' : newValue;
                    stats[index].style.transform = 'scale(1)';
                    stats[index].style.color = '';
                }, 200);
            }
        });
    }
}

// Update stats every 30 seconds with animation
setInterval(updateUrgencyStats, 30000);

// Enhanced Google Analytics tracking
function trackEvent(eventName, parameters = {}) {
    console.log('Event tracked:', eventName, parameters);
    
    // Add visual feedback for tracking
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 10000;
        animation: fadeInUp 0.3s ease-out;
        pointer-events: none;
    `;
    indicator.textContent = `📊 ${eventName}`;
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.animation = 'fadeInUp 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 2000);
}

// Track form interactions with enhanced feedback
leadForm.addEventListener('focus', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        trackEvent('form_field_focus', {
            field_name: e.target.name
        });
        
        // Add glow effect to focused field
        e.target.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.3)';
    }
}, true);

leadForm.addEventListener('blur', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        e.target.style.boxShadow = '';
    }
}, true);

// Track button clicks with enhanced feedback
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_location: e.target.closest('section')?.className || 'unknown'
        });
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            btn.removeChild(ripple);
        }, 600);
    });
});

// Track WhatsApp clicks with enhanced feedback
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
            source: link.closest('section')?.className || 'unknown'
        });
        
        // Add success animation
        link.style.transform = 'scale(1.1)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 200);
    });
});

// Performance optimization: Enhanced lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading animation
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            
            img.onload = () => {
                img.style.filter = 'blur(0)';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Enhanced error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Image failed to load:', this.src);
        
        // Add placeholder with animation
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 14px;
            animation: shimmer 2s infinite;
        `;
        placeholder.textContent = 'Imagem não disponível';
        this.parentNode.insertBefore(placeholder, this);
    });
});

// Preload critical resources with progress indication
function preloadCriticalResources() {
    const criticalImages = [
        'images/nessler-logo.png',
        'images/iphone-hero-real.png',
        'images/iphone-16-pro.png',
        'images/ipad-pro-real.png',
        'images/apple-watch-real.png'
    ];
    
    let loaded = 0;
    const total = criticalImages.length;
    
    const progressIndicator = document.createElement('div');
    progressIndicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        text-align: center;
        display: none;
    `;
    progressIndicator.innerHTML = `
        <div>Carregando recursos...</div>
        <div class="progress-bar" style="margin-top: 10px;">
            <div class="progress-fill" style="--progress-width: 0%;"></div>
        </div>
    `;
    document.body.appendChild(progressIndicator);
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        
        link.onload = () => {
            loaded++;
            const progress = (loaded / total) * 100;
            const progressFill = progressIndicator.querySelector('.progress-fill');
            progressFill.style.setProperty('--progress-width', `${progress}%`);
            
            if (loaded === total) {
                setTimeout(() => {
                    progressIndicator.style.animation = 'fadeInUp 0.3s ease-out reverse';
                    setTimeout(() => {
                        document.body.removeChild(progressIndicator);
                    }, 300);
                }, 500);
            }
        };
        
        document.head.appendChild(link);
    });
}

// Initialize on DOM load with enhanced loading
document.addEventListener('DOMContentLoaded', () => {
    // Add initial loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        preloadCriticalResources();
    }, 100);
    
    // Enhanced form field interactions
    const formInputs = document.querySelectorAll('#leadForm input, #leadForm select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.transform = 'scale(1)';
        });
        
        // Add typing animation feedback
        if (input.type === 'text' || input.type === 'email') {
            input.addEventListener('input', function() {
                this.style.borderColor = '#FF4500';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 200);
            });
        }
    });
});

// Service Worker registration for PWA capabilities with enhanced feedback
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
                
                // Show success notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: #28a745;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    font-size: 14px;
                    z-index: 10000;
                    animation: fadeInLeft 0.5s ease-out;
                `;
                notification.textContent = '📱 App pronto para uso offline';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'fadeInLeft 0.5s ease-out reverse';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 3000);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

