
function randomizeScrapbook() {
    const items = document.querySelectorAll('.scrapbook-item');

    items.forEach(item => {
        // Randomize position values
        const top = Math.floor(Math.random() * 40) - 20; // Random number between -20 and 20
        const left = Math.floor(Math.random() * 40) - 20; // Random number between -20 and 20

        // Randomize size values
        const width = 300; // Random width between 300 and 500
        const height = 300; // Random height between 300 and 500
        
        // Randomize rotation values
        const rotation = Math.floor(Math.random() * 20) - 10; // Random number between -10 and 10 degrees

        // Apply the random styles
        item.style.position = 'relative';
        item.style.top = `${top}px`;
        item.style.left = `${left}px`;
        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.transform = `rotate(${rotation}deg)`;
    });
}

// Call the function when the page loads
window.addEventListener('load', randomizeScrapbook);