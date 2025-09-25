async function openModal(id, type="movie") {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalOverview = document.getElementById("modal-overview");
  const modalMeta = document.getElementById("modal-meta");
  const modalVideo = document.getElementById("modal-video");
  const modalEpisodes = document.getElementById("modal-episodes");

  const data = await fetchData(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=fr-FR`);
  if (!data) return;

  modalTitle.textContent = data.title || data.name;
  modalOverview.textContent = data.overview;
  modalMeta.innerHTML = `<strong>Note :</strong> ${data.vote_average} ⭐ — ${data.release_date || data.first_air_date}`;

  const vids = await fetchData(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=fr-FR`);
  const trailer = vids.results.find(v => v.type === "Trailer" && v.site === "YouTube");

  modalVideo.innerHTML = trailer
    ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
    : "<p>Aucune bande-annonce disponible</p>";

  modalEpisodes.innerHTML = type === "tv"
    ? `<p><strong>Saisons :</strong> ${data.number_of_seasons} — <strong>Épisodes :</strong> ${data.number_of_episodes}</p>`
    : "";

  modal.classList.add("show");
}

document.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(card.dataset.id, card.dataset.type);
});

document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
});
