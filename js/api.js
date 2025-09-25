const API_KEY = "e4b90327227c88daac14c0bd0c1f93cd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Erreur API:", err);
    return null;
  }
}
