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

    // 5. Straight Line Glowing Grid Canvas Engine with Light Wave Ripples
    if (!prefersReducedMotion) {
        initGlowingGridCanvas();
    }

    function initGlowingGridCanvas() {
        const canvas = document.getElementById('bg-ripple-grid-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        const GRID_SIZE = 55;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * Math.min(window.devicePixelRatio, 2);
            canvas.height = height * Math.min(window.devicePixelRatio, 2);
            ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouseX = width / 2;
        let mouseY = height / 2;
        let glowX = width / 2;
        let glowY = height / 2;
        let lastMouseX = 0;
        let lastMouseY = 0;

        const ripples = [];

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
            if (dist > 22) {
                ripples.push({
                    x: e.clientX,
                    y: e.clientY,
                    radius: 0,
                    maxRadius: 240,
                    speed: 4.5,
                    alpha: 1
                });
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            }
        });

        window.addEventListener('click', (e) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 320,
                speed: 5.5,
                alpha: 1
            });
        });

        function animateGlowingGrid() {
            ctx.clearRect(0, 0, width, height);

            // Smooth Lerp Cursor Glow Position
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            const cols = Math.ceil(width / GRID_SIZE) + 1;
            const rows = Math.ceil(height / GRID_SIZE) + 1;

            // 1. Update Active Ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.alpha = 1 - (r.radius / r.maxRadius);
                if (r.radius >= r.maxRadius) {
                    ripples.splice(i, 1);
                }
            }

            // 2. Draw Base Clean & Straight Grid Lines (Zero Distortion)
            ctx.beginPath();
            for (let c = 0; c <= cols; c++) {
                const x = c * GRID_SIZE;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let r = 0; r <= rows; r++) {
                const y = r * GRID_SIZE;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // 3. Draw Expanding Light Wave Glow on Straight Grid Lines
            ripples.forEach(rip => {
                const waveRadius = rip.radius;
                const waveGlowGradient = ctx.createRadialGradient(rip.x, rip.y, Math.max(0, waveRadius - 25), rip.x, rip.y, waveRadius + 25);
                waveGlowGradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
                waveGlowGradient.addColorStop(0.5, `rgba(0, 255, 157, ${rip.alpha * 0.35})`);
                waveGlowGradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

                ctx.beginPath();
                for (let c = 0; c <= cols; c++) {
                    const x = c * GRID_SIZE;
                    if (Math.abs(x - rip.x) <= waveRadius + 30) {
                        ctx.moveTo(x, Math.max(0, rip.y - waveRadius - 30));
                        ctx.lineTo(x, Math.min(height, rip.y + waveRadius + 30));
                    }
                }
                for (let r = 0; r <= rows; r++) {
                    const y = r * GRID_SIZE;
                    if (Math.abs(y - rip.y) <= waveRadius + 30) {
                        ctx.moveTo(Math.max(0, rip.x - waveRadius - 30), y);
                        ctx.lineTo(Math.min(width, rip.x + waveRadius + 30), y);
                    }
                }
                ctx.strokeStyle = waveGlowGradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Expanding Wave Ring
                ctx.beginPath();
                ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 240, 255, ${rip.alpha * 0.3})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });

            // 4. Draw Cursor Following Radial Light Glow Overlay
            const glowRadius = 320;
            const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.42)');
            gradient.addColorStop(0.45, 'rgba(0, 255, 157, 0.22)');
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

            ctx.beginPath();
            for (let c = 0; c <= cols; c++) {
                const x = c * GRID_SIZE;
                if (Math.abs(x - glowX) < glowRadius) {
                    ctx.moveTo(x, Math.max(0, glowY - glowRadius));
                    ctx.lineTo(x, Math.min(height, glowY + glowRadius));
                }
            }
            for (let r = 0; r <= rows; r++) {
                const y = r * GRID_SIZE;
                if (Math.abs(y - glowY) < glowRadius) {
                    ctx.moveTo(Math.max(0, glowX - glowRadius), y);
                    ctx.lineTo(Math.min(width, glowX + glowRadius), y);
                }
            }
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // 5. Draw Glowing Intersection Dots near Cursor
            for (let c = 0; c <= cols; c++) {
                const x = c * GRID_SIZE;
                if (Math.abs(x - glowX) > glowRadius) continue;

                for (let r = 0; r <= rows; r++) {
                    const y = r * GRID_SIZE;
                    const dist = Math.hypot(x - glowX, y - glowY);

                    if (dist < glowRadius) {
                        const alpha = (1 - dist / glowRadius) * 0.75;
                        ctx.beginPath();
                        ctx.arc(x, y, 2.5 * (1 - dist / glowRadius), 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.fill();
                    }
                }
            }

            requestAnimationFrame(animateGlowingGrid);
        }

        animateGlowingGrid();
    }
});
