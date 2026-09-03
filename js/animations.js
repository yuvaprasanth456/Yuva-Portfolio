/* ==========================================================================
   YUVA PRASANTH R - SCROLL REVEALS & CURSOR ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Custom Cursor Tracking (Desktop Only)
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing && window.innerWidth > 768 && !prefersReducedMotion) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursorRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursorRing);
        }

        animateCursorRing();

        // Add Hover Effects on Clickable Elements
        const hoverTargets = document.querySelectorAll('a, button, .tilt-card, input, textarea');
        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 3. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal-element');

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('active'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // If stat numbers exist in this element, trigger counter
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    if (statNumbers.length > 0) {
                        animateStatCounters(statNumbers);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. Animated Number Counters
    function animateStatCounters(statElements) {
        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let count = 0;
            const duration = 1500; // 1.5s
            const stepTime = Math.max(Math.floor(duration / target), 30);

            const timer = setInterval(() => {
                count += 1;
                stat.textContent = count < 10 ? `0${count}` : count;
                if (count >= target) {
                    stat.textContent = target < 10 ? `0${target}` : target;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    }
});
