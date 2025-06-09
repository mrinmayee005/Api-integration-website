async function getNews() {
    /* my api key */ 
  const apiKey = '2f8020a756a24570a24e33c868b9f4a2';

  const categorySelect = document.getElementById('category');
  const category = categorySelect.value;
// url from where all news will come based on the category it will fetch the news
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const featuredSection = document.getElementById('featured-news');
    const newsGrid = document.getElementById('news');

    featuredSection.innerHTML = '';
    newsGrid.innerHTML = '';

    if (data.articles && data.articles.length > 0) {
      // Show the first article as featured
      const first = data.articles[0];

      featuredSection.innerHTML = `
        <img src="${first.urlToImage || 'https://via.placeholder.com/600x320?text=No+Image'}" alt="Featured news image" />
        <div class="featured-news-content">
          <h2>${first.title}</h2>
          <p>${first.description || 'No description available.'}</p>
          <a href="${first.url}" target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      `;

      // Rest of articles
      data.articles.slice(1).forEach(article => {
        const newsItem = document.createElement('article');
        newsItem.classList.add('article');

        newsItem.innerHTML = `
          <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" alt="News image" />
          <div class="article-content">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        `;

        newsGrid.appendChild(newsItem);
      });
    } else {
      featuredSection.innerHTML = '<p>No featured article found.</p>';
      newsGrid.innerHTML = '<p>No news articles found.</p>';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    const featuredSection = document.getElementById('featured-news');
    const newsGrid = document.getElementById('news');
    featuredSection.innerHTML = '<p style="color:red;">Failed to load news. Please try again later.</p>';
    newsGrid.innerHTML = '';
  }
}

// Attach event listener for button (better than inline onclick)
document.getElementById('getNewsBtn').addEventListener('click', getNews);

// Optionally, fetch news on page load for default category
window.addEventListener('load', getNews);
