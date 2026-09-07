/* ==========================================================================
   YUVA PRASANTH R - THREE.JS ORB & SKILL VISUALIZATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initOrbitalSkills();
});

// 2. Skills Orbital 2D/3D Interactive Canvas
function initOrbitalSkills() {
    const canvas = document.getElementById('orbital-skills-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    function resizeCanvas() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width * Math.min(window.devicePixelRatio, 2);
        canvas.height = height * Math.min(window.devicePixelRatio, 2);
        ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const skills = [
        {
            name: 'HTML5',
            color: '#e34f26',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23e34f26" d="M71 460L30 0h452l-41 460-185 52z"/><path fill="%23ef652a" d="M256 472l149-41 35-391H256v432z"/><path fill="%23ebebeb" d="M256 176H150l-8-90h114v90zm0 131h-4l-7-80h-82l15 170 78 22V307z"/><path fill="%23ffffff" d="M256 176h106l-10 110h-96v-20h74l6-70H256v-20zm0 151l78-22 5-60h-83v-20h104l-14 162-85 24V327z"/></svg>'
        },
        {
            name: 'CSS3',
            color: '#264de4',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%231572b6" d="M71 460L30 0h452l-41 460-185 52z"/><path fill="%2333a9dc" d="M256 472l149-41 35-391H256v432z"/><path fill="%23ebebeb" d="M256 176H150l-8-90h114v90zm0 131h-4l-7-80h-82l15 170 78 22V307z"/><path fill="%23ffffff" d="M256 176h106l-10 110h-96v-20h74l6-70H256v-20zm0 151l78-22 5-60h-83v-20h104l-14 162-85 24V327z"/></svg>'
        },
        {
            name: 'JavaScript',
            color: '#f7df1e',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="60" fill="%23f7df1e"/><path fill="%23000000" d="M344 400c10 17 24 30 48 30 20 0 33-10 33-24 0-17-13-22-35-32l-12-5c-35-15-58-34-58-73 0-36 28-64 72-64 31 0 53 11 69 39l-38 24c-8-15-18-21-31-21-14 0-22 9-22 20 0 14 9 20 29 29l12 5c41 18 65 36 65 76 0 43-34 67-77 67-43 0-71-21-85-50zm-131 5c-8 15-18 24-39 24-22 0-36-11-36-38V239h46v150c0 8 3 12 10 12 6 0 10-3 13-10z"/></svg>'
        },
        {
            name: 'Bootstrap',
            color: '#7952b3',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="90" fill="%237952b3"/><path fill="%23ffffff" d="M225 385h-72V127h84c47 0 77 22 77 60 0 25-14 46-37 54 31 7 51 32 51 64 0 45-36 80-103 80zm-27-142h32c23 0 37-11 37-29 0-17-13-28-36-28h-33v57zm0 102h38c26 0 43-12 43-32 0-21-17-33-43-33h-38v65z"/></svg>'
        },
        {
            name: 'React',
            color: '#61dafb',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="45" fill="%2361dafb"/><g stroke="%2361dafb" stroke-width="24" fill="none"><ellipse cx="256" cy="256" rx="230" ry="85"/><ellipse cx="256" cy="256" rx="230" ry="85" transform="rotate(60 256 256)"/><ellipse cx="256" cy="256" rx="230" ry="85" transform="rotate(120 256 256)"/></g></svg>'
        },
        {
            name: 'Git',
            color: '#f05032',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23f05032" d="M504 232L280 8a34 34 0 0 0-48 0L8 232a34 34 0 0 0 0 48l224 224a34 34 0 0 0 48 0l224-224a34 34 0 0 0 0-48z"/><circle cx="210" cy="256" r="32" fill="%23ffffff"/><circle cx="302" cy="164" r="32" fill="%23ffffff"/><circle cx="302" cy="348" r="32" fill="%23ffffff"/><path stroke="%23ffffff" stroke-width="24" fill="none" d="M210 256h40c28 0 52-24 52-52v-40m-52 92v92"/></svg>'
        },
        {
            name: 'GitHub',
            color: '#ffffff',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="%2324292e"/><path fill="%23ffffff" d="M256 30C131 30 30 131 30 256c0 100 65 185 155 215 11 2 15-5 15-11v-38c-63 14-76-30-76-30-10-26-25-33-25-33-20-14 2-13 2-13 23 2 35 23 35 23 20 35 53 25 66 19 2-15 8-25 14-30-51-6-103-25-103-112 0-25 9-45 23-61-2-6-10-29 2-60 0 0 19-6 62 23 18-5 37-8 57-8s39 3 57 8c43-29 62-23 62-23 12 31 5 54 2 60 14 16 23 36 23 61 0 87-53 106-103 112 8 7 16 21 16 43v63c0 6 4 13 16 11 90-30 155-115 155-215 0-125-101-226-226-226z"/></svg>'
        },
        {
            name: 'Responsive',
            color: '#38bdf8',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32" y="64" width="340" height="240" rx="16" fill="none" stroke="%2338bdf8" stroke-width="32"/><rect x="250" y="170" width="230" height="278" rx="20" fill="%230f172a" stroke="%2338bdf8" stroke-width="32"/><circle cx="365" cy="405" r="15" fill="%2338bdf8"/><line x1="140" y1="304" x2="140" y2="380" stroke="%2338bdf8" stroke-width="32"/><line x1="70" y1="380" x2="210" y2="380" stroke="%2338bdf8" stroke-width="32"/></svg>'
        },
        {
            name: 'UI/UX',
            color: '#ff7262',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff7262" d="M110 306l96 96-74 74c-12 12-32 12-44 0l-52-52c-12-12-12-32 0-44l74-74zm292-192l74 74c12 12 12 32 0 44l-192 192-96-96 192-192c12-12 32-12 44 0l22 22 44-44zM32 480l48-16-32-32-16 48z"/></svg>'
        }
    ];

    // Preload vector SVG images for crisp rendering
    skills.forEach(skill => {
        const img = new Image();
        img.src = `data:image/svg+xml;utf8,${skill.svg}`;
        skill.img = img;
    });

    let angle = 0;

    function drawOrbital() {
        ctx.clearRect(0, 0, width, height);

        const isLight = document.body.classList.contains('light-theme') || document.documentElement.classList.contains('light-theme');
        const centerX = width / 2;
        const centerY = height / 2;
        const radiusX = Math.min(width, height) * 0.38;
        const radiusY = radiusX * 0.45;

        // Draw Outer Orbital Ellipse
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.2)' : 'rgba(255, 215, 0, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Inner Glowing Orbit Ring
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX * 0.65, radiusY * 0.65, -Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 170, 0, 0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Orbiting Skill Nodes
        angle += 0.006;

        skills.forEach((skill, i) => {
            const skillAngle = angle + (i * (Math.PI * 2 / skills.length));
            const x = centerX + Math.cos(skillAngle) * radiusX;
            const y = centerY + Math.sin(skillAngle) * radiusY;
            const scale = (Math.sin(skillAngle) + 1.5) / 2.5;

            // Connection Line to Center
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Glowing Node Circle
            const nodeRadius = 20 * scale;
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(13, 20, 34, 0.92)';
            ctx.fill();
            ctx.strokeStyle = skill.color;
            ctx.lineWidth = 2.5 * scale;
            ctx.stroke();

            // Soft glow outline
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius + 3 * scale, 0, Math.PI * 2);
            ctx.strokeStyle = skill.color;
            ctx.globalAlpha = 0.25;
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // Draw Icon Image inside the node circle
            const iconSize = 22 * scale;
            if (skill.img && skill.img.complete) {
                ctx.drawImage(skill.img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
            }

            // Skill Text Label beneath node
            ctx.font = `${Math.max(10, 11.5 * scale)}px "JetBrains Mono", monospace`;
            ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(skill.name, x, y + nodeRadius + 14 * scale);
        });

        requestAnimationFrame(drawOrbital);
    }

    drawOrbital();
}
