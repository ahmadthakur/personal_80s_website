document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/articles.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((articles) => {
      const articleList = document.getElementById("article-list");

      articles.forEach((article) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `article.html?filename=${encodeURIComponent(
          article.filename
        )}`;

        // Fetch the article content to extract the date
        fetch(`content/${article.filename}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
          })
          .then((content) => {
            // Assuming the date is on the second line of the article file
            const lines = content.split("\n");
            const secondLine = lines[2];
            console.log(`Second line of ${article.filename}: ${secondLine}`); // Debugging line
            const dateMatch = secondLine.match(/\*(\d{2}-\d{2}-\d{4})\*/);
            const date = dateMatch ? dateMatch[1] : "Unknown Date";

            // Set the link text with the date before the article name
            link.innerHTML = `${article.title}`;

            // Create a span for the date and style it in italics
            const dateSpan = document.createElement("span");
            dateSpan.style.fontStyle = "italic";
            dateSpan.style.color = "black";
            dateSpan.innerHTML = `&nbsp;&nbsp;&nbsp;${date}`;

            listItem.appendChild(link);
            listItem.appendChild(dateSpan);
            articleList.appendChild(listItem);
          })
          .catch((error) => {
            console.error("Error fetching article content:", error);
            // Fallback to just the article title if there's an error
            link.textContent = article.title;
            listItem.appendChild(link);
            articleList.appendChild(listItem);
          });
      });
    })
    .catch((error) => console.error("Error fetching articles:", error));
});
