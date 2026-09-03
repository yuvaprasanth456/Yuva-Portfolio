/* ==========================================================================
   YUVA PRASANTH R - MAIN INTERACTION & MODAL LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Sticky & Active Link Tracking
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Navbar Padding Compact
        if (scrollY > 50) {
            navbarWrapper.style.transform = 'translateY(-5px)';
        } else {
            navbarWrapper.style.transform = 'translateY(0)';
        }

        // Active Section Highlight
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close Mobile Menu on Nav Link Click
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Custom 3D Tilt Card Interaction
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X inside card
            const y = e.clientY - rect.top;  // Mouse Y inside card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt angle (-10 to 10 deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

            // Light Glow Follow Cursor in Skill Cards
            const lightGlow = card.querySelector('.skill-light-glow');
            if (lightGlow) {
                lightGlow.style.left = `${x}px`;
                lightGlow.style.top = `${y}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // 4. Project Showcase Modal System
    const projectData = {
        'trend-caption': {
            title: 'TREND CAPTION',
            category: '01 — FEATURED WEB APP',
            description: 'A modern AI-powered social media caption and viral trend generator web application designed for content creators, marketers, and influencers to instantly craft engaging captions, hashtags, and viral content ideas.',
            overview: 'Trend Caption empowers content creators by leveraging AI algorithms to automatically craft catchy captions, optimize hashtag strategies, and discover trending topics across social media platforms.',
            features: [
                'AI Caption & Hashtag Generation Engine for Instagram, X, LinkedIn & TikTok',
                'Sleek Dark Responsive Interface with Glassmorphism UI & Micro-interactions',
                'One-Click Copy, Preset Platform Tags & Custom Tonal Selectors',
                'High Performance & Fluid User Experience Across All Devices'
            ],
            technologies: ['React', 'JavaScript', 'CSS3', 'AI API', 'Responsive UI'],
            challenges: 'Optimizing API response handling while maintaining smooth UI state transitions and crisp responsive layouts across all mobile viewports.',
            github: 'https://github.com',
            live: 'https://trendcaption.lovable.app/',
            image: 'assets/images/trend-caption-preview.png'
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content');
    const openModalBtns = document.querySelectorAll('.open-project-modal');

    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && modalOverlay && modalContent) {
                modalContent.innerHTML = `
                    <div class="modal-header-info">
                        <span class="section-tag">${data.category}</span>
                        <h2 class="modal-project-title" id="modal-project-title">${data.title}</h2>
                    </div>

                    ${data.image ? `
                    <div class="modal-image-preview">
                        <img src="${data.image}" alt="${data.title}" class="modal-preview-img">
                    </div>
                    ` : ''}
                    
                    <p class="modal-description">${data.description}</p>
                    
                    <div class="modal-section">
                        <h3 class="modal-subheading">PROJECT OVERVIEW</h3>
                        <p>${data.overview}</p>
                    </div>

                    <div class="modal-section">
                        <h3 class="modal-subheading">KEY FEATURES</h3>
                        <ul class="modal-feature-list">
                            ${data.features.map(f => `<li><i class="fa-solid fa-check text-gradient"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="modal-section">
                        <h3 class="modal-subheading">TECHNOLOGIES USED</h3>
                        <div class="project-tech-tags">
                            ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div class="modal-section">
                        <h3 class="modal-subheading">CHALLENGES & SOLUTIONS</h3>
                        <p>${data.challenges}</p>
                    </div>

                    <div class="modal-actions">
                        <a href="${data.live}" target="_blank" rel="noopener" class="btn btn-primary">
                            <span>LIVE DEMO</span>
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                        <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-glass">
                            <span>VIEW CODE</span>
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>
                `;

                modalOverlay.classList.add('active');
                modalOverlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            modalOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 5. Contact Form Interactive Validation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Please fill out all required fields.';
                return;
            }

            // Success feedback
            formFeedback.className = 'form-feedback success';
            formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();

            setTimeout(() => {
                formFeedback.textContent = '';
            }, 5000);
        });
    }
});
