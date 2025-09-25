async function loadHero() {
  const data = await fetchData(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
  if (!data) return;

  const random = data.results[Math.floor(Math.random() * data.results.length)];
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".hero .title");
  const desc = document.querySelector(".hero .desc");
  const playBtn = document.querySelector(".hero .btn.play");

  hero.style.backgroundImage = `url(${IMAGE_BASE_URL + random.backdrop_path})`;
  title.textContent = random.title || random.name;
  desc.textContent = random.overview || "Pas de description disponible";

  playBtn.onclick = () => openModal(random.id, "movie");
}
