// animation.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    alpha: true,
});

function resizeCanvas() {
    const canvas = renderer.domElement;
    const aspectRatio = window.innerWidth / window.innerHeight;

    // Set the canvas size based on the aspect ratio
    if (aspectRatio > 1) {
        // Landscape mode
        canvas.style.width = '80%';
        canvas.style.height = '100vh';
    } else {
        // Portrait mode
        canvas.style.width = '100%';
        canvas.style.height = '100vh';
    }

    // Update the camera aspect ratio and renderer size
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Initial call to set up the canvas size
resizeCanvas();

// Handle window resize
window.addEventListener("resize", resizeCanvas);

camera.position.set(0, 40, 50); // Set camera position slightly above the model
camera.lookAt(0, 0, 0);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(50, 50, 50).normalize();
scene.add(directionalLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 2, 100); // Increase point light intensity
pointLight.position.set(0, 50, 50);
scene.add(pointLight);



// Load the GLB model
const loader = new THREE.GLTFLoader();
loader.load(
    "images/low-poly_floating_island.glb", // Make sure to provide the correct path to your GLB file
    (gltf) => {
        
        scene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (scene.children.length > 0) {
        scene.rotation.y += 0.005; // Optional: Rotate the model
    }

    renderer.render(scene, camera);
}

// Start the animation loop
animate();

