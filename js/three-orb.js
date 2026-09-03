/* ==========================================================================
   YUVA PRASANTH R - THREE.JS ORB & SKILL VISUALIZATIONS
   ========================================================================== */

// 1. Contact Section Background 3D Glowing Orb
document.addEventListener('DOMContentLoaded', () => {
    initContactOrb();
    initOrbitalSkills();
});

function initContactOrb() {
    const canvas = document.getElementById('contact-orb-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Orb Mesh (Icosahedron with wireframe and glowing point lights)
    const geometry = new THREE.IcosahedronGeometry(1.8, 4);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    const orbMesh = new THREE.Mesh(geometry, material);
    scene.add(orbMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        orbMesh.rotation.y = elapsedTime * 0.2;
        orbMesh.rotation.x = elapsedTime * 0.1;

        coreMesh.rotation.y = -elapsedTime * 0.3;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    });
}

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
        { name: 'HTML5', color: '#ff5722' },
        { name: 'CSS3', color: '#29b6f6' },
        { name: 'JavaScript', color: '#f7df1e' },
        { name: 'Bootstrap', color: '#7952b3' },
        { name: 'React', color: '#61dafb' },
        { name: 'Git', color: '#f05032' },
        { name: 'GitHub', color: '#ffffff' },
        { name: 'Responsive', color: '#00ff9d' },
        { name: 'UI/UX', color: '#00f0ff' }
    ];

    let angle = 0;

    function drawOrbital() {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radiusX = Math.min(width, height) * 0.38;
        const radiusY = radiusX * 0.45;

        // Draw Outer Orbital Ellipse
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Inner Glowing Orbit Ring
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX * 0.65, radiusY * 0.65, -Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.15)';
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
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Glowing Node Circle
            ctx.beginPath();
            ctx.arc(x, y, 14 * scale, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(13, 20, 34, 0.9)';
            ctx.fill();
            ctx.strokeStyle = skill.color;
            ctx.lineWidth = 2 * scale;
            ctx.stroke();

            // Skill Text Label
            ctx.font = `${Math.max(10, 12 * scale)}px "JetBrains Mono", monospace`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(skill.name, x, y + 24 * scale);
        });

        requestAnimationFrame(drawOrbital);
    }

    drawOrbital();
}
