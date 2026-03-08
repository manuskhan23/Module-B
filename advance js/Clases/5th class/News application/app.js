const API_KEY = "304bb614a4e749fdbb01448f82b94867";

const searchInput = document.getElementById("searchInput");
const newsRow = document.getElementById("newsRow");
const msg = document.getElementById("msg");

let fetchNews=() => {
  const query = searchInput.value.trim();

  if (!query) {
    msg.innerText = "Type something first.";
    newsRow.innerHTML = "";
    return;
  }

  msg.innerText = "Loading news...";
  newsRow.innerHTML = "";

  fetch(
    `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      msg.innerText = "";

      if (!data.articles || data.articles.length === 0) {
        msg.innerText = "No news found.";
        return;
      }

      data.articles.forEach((article) => {
        if (!article.urlToImage) return;

        newsRow.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100">
              <img src="${article.urlToImage}" alt="news">
              <div class="card-body">
                <h5 class="card-title">${article.title.slice(0, 20)}...</h5>
                <p class="card-text">${article.description.slice(0, 100)}...</p>
                <a href="${article.url}" target="_blank" class="btn btn-sm btn-warning">
                  Read More
                </a>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(() => {
      msg.innerText = "Error loading news.";
    });
}
