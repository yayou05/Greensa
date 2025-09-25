function loadSections() {
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
}
