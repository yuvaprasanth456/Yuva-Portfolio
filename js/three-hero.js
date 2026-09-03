/* ==========================================================================
   YUVA PRASANTH R - THREE.JS HERO INTERACTIVE 3D VISUAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightBlue = new THREE.PointLight(0x00f0ff, 2.5, 50);
    pointLightBlue.position.set(5, 5, 5);
    scene.add(pointLightBlue);

    const pointLightGreen = new THREE.PointLight(0x00ff9d, 2.5, 50);
    pointLightGreen.position.set(-5, -5, 5);
    scene.add(pointLightGreen);

    // 3. Central Abstract Developer Geometry Group
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Central Core Object Removed per user request


    // Orbital rings removed per user request

    // 4. Floating Holographic Code Panels (3D Planes)
    function createCodeTexture(textLines, accentColor) {
        const canvasText = document.createElement('canvas');
        canvasText.width = 256;
        canvasText.height = 128;
        const ctx = canvasText.getContext('2d');

        // Background
        ctx.fillStyle = 'rgba(13, 20, 34, 0.85)';
        ctx.fillRect(0, 0, 256, 128);

        // Border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 252, 124);

        // Text
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillStyle = accentColor;
        textLines.forEach((line, idx) => {
            ctx.fillText(line, 16, 30 + idx * 24);
        });

        return new THREE.CanvasTexture(canvasText);
    }

    const panelTexture1 = createCodeTexture(['const app = () => {', '  return <ReactUI />', '}'], '#00f0ff');
    const panelGeo1 = new THREE.PlaneGeometry(1.6, 0.8);
    const panelMat1 = new THREE.MeshBasicMaterial({
        map: panelTexture1,
        transparent: true,
        side: THREE.DoubleSide
    });
    const panel1 = new THREE.Mesh(panelGeo1, panelMat1);
    panel1.position.set(2.2, 1.2, 0.5);
    heroGroup.add(panel1);

    const panelTexture2 = createCodeTexture(['.futuristic-ui {', '  display: flex;', '  glow: electric;', '}'], '#00ff9d');
    const panelGeo2 = new THREE.PlaneGeometry(1.6, 0.8);
    const panelMat2 = new THREE.MeshBasicMaterial({
        map: panelTexture2,
        transparent: true,
        side: THREE.DoubleSide
    });
    const panel2 = new THREE.Mesh(panelGeo2, panelMat2);
    panel2.position.set(-2.2, -1.0, 0.8);
    heroGroup.add(panel2);

    // 5. Floating Glowing Particle Field
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x00f0ff);
    const colorGreen = new THREE.Color(0x00ff9d);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

        const mixedColor = Math.random() > 0.5 ? colorBlue : colorGreen;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Movement & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // 7. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth Lerp Mouse Movement
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Group Rotations
        heroGroup.rotation.y = elapsedTime * 0.3 + targetX * 0.8;
        heroGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.5;

        // Profile Image Subtle 3D Mouse Parallax Tilt
        const profileImg = document.querySelector('.hero-profile-img');
        if (profileImg) {
            profileImg.style.transform = `perspective(1000px) rotateY(${targetX * 10}deg) rotateX(${-targetY * 10}deg) translateZ(10px)`;
        }

        // Panel Floating Wave Effect
        panel1.position.y = 1.2 + Math.sin(elapsedTime * 1.5) * 0.15;
        panel2.position.y = -1.0 + Math.cos(elapsedTime * 1.5) * 0.15;

        // Particle Rotation
        particles.rotation.y = elapsedTime * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // 8. Responsive Canvas Resize
    function handleResize() {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height, false);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
