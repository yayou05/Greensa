const API_KEY = "e4b90327227c88daac14c0bd0c1f93cd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// === HERO dynamique ===
async function loadHero() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await res.json();

    // On prend un film aléatoire
    const random = data.results[Math.floor(Math.random() * data.results.length)];

    // Sélecteurs
    const hero = document.querySelector(".hero"); // section entière pour l’image
    const title = document.querySelector(".hero .title");
    const desc = document.querySelector(".hero .desc");
    const playBtn = document.querySelector(".hero .btn.play");

    // Image en fond sur la section hero
    hero.style.backgroundImage = `url(${IMAGE_BASE_URL + random.backdrop_path})`;

    // Texte
    title.textContent = random.title || random.name;
    desc.textContent = random.overview || "Pas de description disponible";

    // Bouton lecture
    playBtn.onclick = () => openModal(random.id, "movie");

  } catch (err) {
    console.error("Erreur Hero:", err);
  }
}


// Charger le hero au démarrage
loadHero();


// === Charger les sections dynamiques ===
document.querySelectorAll(".populaire").forEach(section => {
  const endpoint = section.dataset.endpoint;
  const type = section.dataset.type;
  const cardsContainer = section.querySelector(".cards");

  fetch(`${BASE_URL}/${type}/${endpoint}?api_key=${API_KEY}&language=fr-FR`)
    .then(res => res.json())
    .then(data => {
      cardsContainer.innerHTML = data.results.map(item => `
        <div class="card" data-id="${item.id}" data-type="${type}">
          <img src="${IMAGE_BASE_URL + item.poster_path}" alt="${item.title || item.name}">
          <div class="card-overlay">
            <h4>${item.title || item.name}</h4>
            <div class="meta">
              <span>${(item.release_date || item.first_air_date || "").slice(0,4)}</span>
              <span>${item.vote_average} ⭐</span>
            </div>
          </div>
        </div>
      `).join("");
    });
});

// === Modal ===
async function openModal(id, type="movie") {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalOverview = document.getElementById("modal-overview");
  const modalMeta = document.getElementById("modal-meta");
  const modalVideo = document.getElementById("modal-video");
  const modalEpisodes = document.getElementById("modal-episodes");

  // Infos générales
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=fr-FR`);
  const data = await res.json();

  modalTitle.textContent = data.title || data.name;
  modalOverview.textContent = data.overview;
  modalMeta.innerHTML = `<strong>Note :</strong> ${data.vote_average} ⭐ — ${data.release_date || data.first_air_date}`;

  // Trailer
  const resVid = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=fr-FR`);
  const vids = await resVid.json();
  const trailer = vids.results.find(v => v.type === "Trailer" && v.site === "YouTube");

  modalVideo.innerHTML = trailer
    ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
    : "<p>Aucune bande-annonce disponible</p>";

  // Épisodes si série
  if (type === "tv") {
    modalEpisodes.innerHTML = `<p><strong>Saisons :</strong> ${data.number_of_seasons} — <strong>Épisodes :</strong> ${data.number_of_episodes}</p>`;
  } else {
    modalEpisodes.innerHTML = "";
  }

  modal.classList.add("show");
}

// Écouteurs pour ouvrir modal
document.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) {
    openModal(card.dataset.id, card.dataset.type);
  }
});

// Fermer modal
document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
});


// === Recherche ===
const searchInput = document.querySelector(".search input");
const searchResultsContainer = document.querySelector(".search-results");
const popularContainer = document.querySelector(".populaire .cards");

// Crée une card
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

  // click pour afficher la bande annonce
  card.addEventListener("click", async () => {
    const res = await fetch(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
    if(trailer){
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
      alert("Bande annonce non disponible");
    }
  });

  return card;
}

// Récupère les films populaires
async function loadPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  data.results.forEach(movie => {
    popularContainer.appendChild(createCard(movie));
  });
}

// Recherche
async function searchMovies(query) {
  if(!query) return;
  searchResultsContainer.innerHTML = "";
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if(data.results.length === 0){
      searchResultsContainer.innerHTML = "<p>Aucun film trouvé.</p>";
    } else {
      data.results.forEach(movie => searchResultsContainer.appendChild(createCard(movie)));
    }
  } catch(err){
    console.error(err);
  }
}

// Écoute sur Entrée
searchInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && searchInput.value.trim() !== ""){
    searchMovies(searchInput.value.trim());
  }
});

// Charger films populaires au démarrage
loadPopular();
