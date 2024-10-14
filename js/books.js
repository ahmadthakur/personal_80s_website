document.addEventListener("DOMContentLoaded", () => {
    const GOODREADS_RSS_URL = 'https://www.goodreads.com/review/list_rss/157215819?shelf=read'; // Replace with your RSS feed URL
    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
  
    fetch(CORS_PROXY + encodeURIComponent(GOODREADS_RSS_URL))
      .then(response => response.json())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        const bookList = document.getElementById("book-list");
  
        items.forEach(item => {
          const title = item.querySelector("title").textContent;
          const author = item.querySelector("author_name").textContent;
          const dateRead = item.querySelector("user_read_at").textContent;
          const coverImage = item.querySelector("book_large_image_url").textContent;
  
          // Format the date to remove the timestamp
          const formattedDate = new Date(dateRead).toDateString();
  
          const listItem = document.createElement("li");
          const bookInfo = document.createElement("div");
          const bookCover = document.createElement("img");
  
          bookCover.src = coverImage;
          bookCover.alt = `${title} cover`;
  
          bookInfo.innerHTML = `<strong>${title}</strong> by ${author}<br><em>Read on: ${formattedDate}</em>`;
  
          listItem.appendChild(bookCover);
          listItem.appendChild(bookInfo);
          bookList.appendChild(listItem);
        });
      })
      .catch(error => console.error("Error fetching books:", error));
  });