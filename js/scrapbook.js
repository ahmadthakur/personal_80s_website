document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/scrapbook.json")
    .then((response) => response.json())
    .then((data) => {
      const scrapbookGrid = document.getElementById("scrapbook-grid");
      data.forEach((item) => {
        let element;
        if (item.iframe) {
          element = document.createElement("iframe");
          element.width = item.width;
          element.height = item.height;
          element.src = item.src;
          element.frameBorder = "0";
          element.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          element.allowFullscreen = true;
          element.loading = "lazy"; // Add class name for iframes
        } else {
          element = document.createElement("a");
          element.title = item.alt;
          if (item.href) {
            element.href = item.href;
            element.target = "_blank";
          }
          element.target = "_blank";
          element.className = "scrapbook-item";
          const img = document.createElement("img");
          img.src = item.src;
          img.alt = item.alt;
          img.loading = "lazy";
          element.appendChild(img);
        }
        scrapbookGrid.appendChild(element);
      });

      // Call the randomize function after elements are added to the DOM
      randomizeScrapbook();
    })
    .catch((error) => console.error("Error loading scrapbook items:", error));
});

function randomizeScrapbook() {
  const items = document.querySelectorAll(".scrapbook-item");

  items.forEach((item) => {
    // Randomize position values
    const top = Math.floor(Math.random() * 40) - 20; // Random number between -20 and 20
    const left = Math.floor(Math.random() * 40) - 20; // Random number between -20 and 20

    // Size values
    const width = 400; //
    const height = 400; //

    // Randomize rotation values
    const rotation = Math.floor(Math.random() * 20) - 10; // Random number between -10 and 10 degrees

    // Apply the random styles
    item.style.position = "relative";
    item.style.top = `${top}px`;
    item.style.left = `${left}px`;

    item.style.width = `${width}px`;

    if (item.quote) {
      const currentWidth = parseFloat(item.style.width);
      item.style.width = `${currentWidth * 2}px`;
     
    }
  });
}

// Call the function when the page loads
window.addEventListener("load", randomizeScrapbook);
