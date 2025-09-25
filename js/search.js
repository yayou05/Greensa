const searchInput = document.querySelector(".search input");
const searchResultsContainer = document.querySelector(".search-results");
const popularContainer = document.querySelector(".populaire .cards");

function createCard(movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.title}">
    <div class="card-info">
      <h4>${movie.title}</h4>
      <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
    </div>
  `;

  card.addEventListener("click", async () => {
    const data = await fetchData(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
    const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
    if(trailer){
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
      alert("Bande annonce non disponible");
    }
  });

  return card;
}

async function loadPopular() {
  const data = await fetchData(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!data) return;
  data.results.forEach(movie => {
    popularContainer.appendChild(createCard(movie));
  });
}

async function searchMovies(query) {
  if (!query) {
    searchResultsContainer.style.display = "none";
    return;
  }
  const data = await fetchData(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`);
  if (!data) return;

  searchResultsContainer.innerHTML = "";
  if (data.results.length === 0) {
    searchResultsContainer.innerHTML = `<div class="result-item">Aucun résultat trouvé</div>`;
  } else {
    data.results.forEach(movie => {
      const item = document.createElement("div");
      item.classList.add("result-item");
      item.innerHTML = `
        <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/40x60?text=No+Image'}" alt="${movie.title}">
        <span class="result-text">${movie.title} (${movie.release_date ? movie.release_date.slice(0,4) : "N/A"})</span>
      `;
      item.addEventListener("click", () => {
        openModal(movie.id, "movie");
        searchResultsContainer.style.display = "none";
        searchInput.value = "";
      });
      searchResultsContainer.appendChild(item);
    });
  }
  searchResultsContainer.style.display = "flex";
}

searchInput.addEventListener("input", e => searchMovies(e.target.value.trim()));

document.addEventListener("click", e => {
  if (!e.target.closest(".search")) searchResultsContainer.style.display = "none";
});

searchInput.addEventListener("keydown", e => {
  if(e.key === "Enter" && searchInput.value.trim() !== ""){
    searchMovies(searchInput.value.trim());
  }
});
