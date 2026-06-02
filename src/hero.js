import * as THREE from 'three';
import logoUrl from '../RmaN Logo Big Transparent Logo Main Only R - Mask - White.png';
// All shader code adapted to live inside the hero section canvas container
(function(){
    const heroSection = document.getElementById('immersive-hero');
    const container = document.getElementById('immersive-canvas-container');
    const scene = new THREE.Scene(); // Holds the raw fluid blobs
    const postScene = new THREE.Scene(); // Holds the full-screen liquid quad
    
    // Setup Cameras
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 120;
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Offscreen Render Target for the Metaball/Fluid effect
    const renderTarget = new THREE.WebGLRenderTarget(container.clientWidth, container.clientHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
    });

    // --- SHADERS (THE MERCURY FLUID EFFECT) ---
    
    // 1. Particle Shader: Renders soft glowing blobs that accumulate thickness
    const particleVertexShader = `
        attribute float size;
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (250.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const particleFragmentShader = `
        void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            // Soft gradient (Gaussian-like curve) for smooth merging
            float alpha = pow((0.5 - ll) * 2.0, 1.8); 
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.8);
        }
    `;

    const particleMaterial = new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending // Crucial for accumulating liquid thickness
    });

    // 2. Post-Processing Shader: Calculates fluid surface and metallic lighting with chromatic aberration
    const postVertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const postFragmentShader = `
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uTime;
        varying vec2 vUv;

        // Function for rainbow color
        vec3 rainbow(float t) {
            return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
        }

        void main() {
            // Sample center for thickness and alpha
            vec4 texColor = texture2D(tDiffuse, vUv);
            float v = texColor.a; 
            
            float threshold = 0.5;
            if (v < threshold) {
                discard;
                return;
            }
            vec2 texel = 1.0 / uResolution;
            float aspect = uResolution.x / uResolution.y;
            vec2 aspectCorrection = vec2(aspect, 1.0);
            float mouseDist = distance(vUv * aspectCorrection, uMouse * aspectCorrection);
            float interactionStrength = smoothstep(0.25, 0.0, mouseDist);
            float baseChrom = 0.003;
            vec2 chromOffset = vec2(baseChrom + interactionStrength * 0.008, 0.0);

            float step = 1.0;
            float v0 = texture2D(tDiffuse, vUv + vec2(-texel.x * step, 0.0)).a;
            float v1 = texture2D(tDiffuse, vUv + vec2(texel.x * step, 0.0)).a;
            float v2 = texture2D(tDiffuse, vUv + vec2(0.0, -texel.y * step)).a;
            float v3 = texture2D(tDiffuse, vUv + vec2(0.0, texel.y * step)).a;

            vec3 normal = normalize(vec3(v0 - v1, v2 - v3, 0.15));
            vec3 lightDir = normalize(vec3(0.4, 0.8, 0.5));
            vec3 lightDir2 = normalize(vec3(-0.5, -0.2, 0.8));
            vec3 viewDir = vec3(0.0, 0.0, 1.0);
            vec3 halfVector = normalize(lightDir + viewDir);
            vec3 halfVector2 = normalize(lightDir2 + viewDir);

            float diffuse = max(dot(normal, lightDir), 0.0);
            float specular = pow(max(dot(normal, halfVector), 0.0), 80.0);
            float specular2 = pow(max(dot(normal, halfVector2), 0.0), 40.0) * 0.4;

            vec3 baseCol = vec3(0.15, 0.15, 0.15);
            vec3 env;
            env.r = smoothstep(0.0, 1.0, normal.y + chromOffset.x * 5.0);
            env.g = smoothstep(0.0, 1.0, normal.y);
            env.b = smoothstep(0.0, 1.0, normal.y - chromOffset.x * 5.0);
            env = mix(baseCol, env, 0.8);
            env = mix(env, vec3(0.02), smoothstep(0.0, 1.0, -normal.y) * 0.8);

            vec3 finalColor = env * (diffuse * 0.5 + 0.5) + vec3(1.0) * specular + vec3(0.8, 0.9, 1.0) * specular2;
            vec3 rainbowColor = rainbow(uTime * 0.3 + vUv.x * 3.0 + vUv.y * 2.0);
            finalColor = mix(finalColor, rainbowColor, interactionStrength * 0.6);

            float alpha = smoothstep(threshold, threshold + 0.05, v);
            gl_FragColor = vec4(finalColor, alpha);
        }
    `;

    const postMaterial = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: renderTarget.texture },
            uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0.0 }
        },
        vertexShader: postVertexShader,
        fragmentShader: postFragmentShader,
        transparent: true
    });

    const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial);
    postScene.add(postQuad);

    // Particles
    let particlesData = [];
    let particleSystem;
    let positions, sizes;
    const mouse = new THREE.Vector2(-1000, -1000);
    const mouse3D = new THREE.Vector3();
    const uMouse = new THREE.Vector2(0.5, 0.5);
    let time = 0;
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // Responsiveness helpers
    let particleScale = 0.18; // base pixel-to-world multiplier (adjusted per screen)
    let sizeMultiplier = 1.0;
    let lastImageData = null;
    let lastImgW = 0;
    let lastImgH = 0;
    let resizeTimer = null;
    const PARTICLE_SCALE_MIN = 0.10;
    const PARTICLE_SCALE_MAX = 0.22;

    function createParticles(imageData, width, height){
        lastImageData = imageData;
        lastImgW = width;
        lastImgH = height;

        const baseScale = (Math.min(container.clientWidth, container.clientHeight) / 500) * 0.18;
        particleScale = Math.max(PARTICLE_SCALE_MIN, Math.min(PARTICLE_SCALE_MAX, baseScale));
        sizeMultiplier = particleScale / 0.18;

        const tempParticles = [];
        for(let y=0;y<height;y+=2){
            for(let x=0;x<width;x+=2){
                const idx = (y*width + x)*4;
                const r = imageData.data[idx]; const g = imageData.data[idx+1]; const b = imageData.data[idx+2]; const a = imageData.data[idx+3];
                if(a>128 && (r>50||g>50||b>50)){
                    const px = (x - width/2) * particleScale;
                    const py = -(y - height/2) * particleScale;
                    const pz = 0;
                    tempParticles.push({ x:px,y:py,z:pz, ox:px,oy:py,oz:pz, vx:0,vy:0,vz:0, baseSize: Math.random()*8 + 6 });
                }
            }
        }

        const MAX_PARTICLES = 12000;
        if(tempParticles.length > MAX_PARTICLES){ tempParticles.sort(()=>0.5-Math.random()); particlesData = tempParticles.slice(0, MAX_PARTICLES); } else particlesData = tempParticles;

        const particleCount = particlesData.length;
        if(particleCount === 0){
            // fallback textured plane
            let tex = null;
            const data = new Uint8Array([255,255,255,255]);
            tex = new THREE.DataTexture(data,1,1,THREE.RGBAFormat);
            tex.needsUpdate = true;
            const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
            const planeGeo = new THREE.PlaneGeometry(300, 300);
            if(particleSystem) scene.remove(particleSystem);
            particleSystem = new THREE.Mesh(planeGeo, mat);
            scene.add(particleSystem);
            return;
        }

        const geometry = new THREE.BufferGeometry();
        positions = new Float32Array(particleCount*3);
        sizes = new Float32Array(particleCount);

        const spread = 200 * sizeMultiplier;
        for(let i=0;i<particleCount;i++){
            positions[i*3] = (Math.random()-0.5) * spread;
            positions[i*3+1] = (Math.random()-0.5) * spread;
            positions[i*3+2] = (Math.random()-0.5) * spread;
            sizes[i] = particlesData[i].baseSize * sizeMultiplier;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes,1));

        if(particleSystem) scene.remove(particleSystem);
        particleSystem = new THREE.Points(geometry, particleMaterial);
        scene.add(particleSystem);
    }

    function loadLogoFromUrl(url){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const base = Math.min(Math.max(200, Math.round(Math.min(container.clientWidth, container.clientHeight))), 600);
        canvas.width = base;
        canvas.height = base;

        const img = new Image(); img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.9;
            const w = img.width * scale; const h = img.height * scale;
            const x = (canvas.width - w) / 2; const y = (canvas.height - h) / 2;
            ctx.drawImage(img, x, y, w, h);
            const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            createParticles(imageData, canvas.width, canvas.height);
        };
        img.src = url;
    }

    loadLogoFromUrl(logoUrl);

    window.addEventListener('mousemove', (event) => {
        const rect = heroSection.getBoundingClientRect();
        if(event.clientY >= rect.top && event.clientY <= rect.bottom && event.clientX >= rect.left && event.clientX <= rect.right) {
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            uMouse.x = (event.clientX - rect.left) / rect.width;
            uMouse.y = 1.0 - ((event.clientY - rect.top) / rect.height);
            if(postMaterial) {
                postMaterial.uniforms.uMouse.value.copy(uMouse);
            }
        }
    });

    window.addEventListener('touchmove', (event) => {
        if(event.touches && event.touches[0]) {
            const touch = event.touches[0];
            const rect = heroSection.getBoundingClientRect();
            if(touch.clientY >= rect.top && touch.clientY <= rect.bottom && touch.clientX >= rect.left && touch.clientX <= rect.right) {
                mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                uMouse.x = (touch.clientX - rect.left) / rect.width;
                uMouse.y = 1.0 - ((touch.clientY - rect.top) / rect.height);
                if(postMaterial) {
                    postMaterial.uniforms.uMouse.value.copy(uMouse);
                }
            }
        }
    }, { passive: true });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if(scrollIndicator){
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('tabindex', '0');
        const doScroll = ()=>{ const root = document.getElementById('root'); if(root) root.scrollIntoView({behavior:'smooth'}); };
        scrollIndicator.addEventListener('click', doScroll);
        scrollIndicator.addEventListener('touchstart', function(e){ e.preventDefault(); doScroll(); }, { passive:false });
        scrollIndicator.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { doScroll(); } });
    }

    function updateSizes(){
        const w = container.clientWidth; const h = container.clientHeight;
        camera.aspect = w/h; camera.updateProjectionMatrix();
        renderer.setSize(w,h); renderTarget.setSize(w,h); postMaterial.uniforms.uResolution.value.set(w,h);
        camera.position.z = Math.max(120, Math.min(600, Math.max(w,h) * 0.12));
        if(lastImageData){ createParticles(lastImageData, lastImgW, lastImgH); }
    }

    window.addEventListener('resize', ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateSizes, 120);
    });

    function animate(){ 
        requestAnimationFrame(animate); 
        time += 0.01; 
        if(postMaterial) postMaterial.uniforms.uTime.value = time; 
        if(particleSystem && particlesData.length>0){ 
            raycaster.setFromCamera(mouse, camera); 
            raycaster.ray.intersectPlane(plane, mouse3D); 
            const positionsAttr = particleSystem.geometry.attributes.position; 
            const array = positionsAttr.array; 
            const stiffness = 0.04; 
            const damping = 0.75; 
            const repelRadius = 22.0 * sizeMultiplier; 
            const repelForce = 1.3; 
            for(let i=0;i<particlesData.length;i++){ 
                const p = particlesData[i]; 
                const dx = p.ox - p.x; 
                const dy = p.oy - p.y; 
                const dz = p.oz - p.z; 
                p.vx += dx * stiffness; 
                p.vy += dy * stiffness; 
                p.vz += dz * stiffness; 
                const mdx = p.x - mouse3D.x; 
                const mdy = p.y - mouse3D.y; 
                const mdz = p.z - mouse3D.z; 
                const distSq = mdx*mdx + mdy*mdy + mdz*mdz; 
                const dist = Math.sqrt(distSq) || 1.0; 
                if(dist < repelRadius){ 
                    const force = (repelRadius - dist) / repelRadius; 
                    p.vx += (mdx / dist) * force * repelForce; 
                    p.vy += (mdy / dist) * force * repelForce; 
                    p.vz += force * (repelForce * 1.5); 
                } 
                p.vx *= damping; 
                p.vy *= damping; 
                p.vz *= damping; 
                p.x += p.vx; 
                p.y += p.vy; 
                p.z += p.vz; 
                array[i*3] = p.x; 
                array[i*3+1] = p.y; 
                array[i*3+2] = p.z; 
            } 
            positionsAttr.needsUpdate = true; 
            particleSystem.rotation.y = Math.sin(Date.now() * 0.0005) * 0.15; 
            particleSystem.rotation.x = Math.cos(Date.now() * 0.0003) * 0.05; 
        } 
        renderer.setRenderTarget(renderTarget); 
        renderer.clear(); 
        renderer.render(scene, camera);
        renderer.setRenderTarget(null); 
        renderer.render(postScene, postCamera);
    }

    animate();
})();
