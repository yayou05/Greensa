# Greensa

🚀 Fonctionnalités

🎬 Hero dynamique : un film populaire affiché en arrière-plan de la page d’accueil.

🃏 Sections dynamiques : affichage des films/séries populaires et mieux notés.

🔍 Recherche en temps réel : suggestions instantanées dans une liste déroulante.

🎥 Modal Netflix-like : affichage des détails d’un film/série avec bande-annonce YouTube intégrée.

📱 Responsive design : interface adaptée aux écrans desktop, tablettes et mobiles.

🛠️ Technologies utilisées

HTML5

CSS3 (responsive, flexbox, grid, animations)

JavaScript (ES6)

API TMDB (documentation
)

📂 Structure du projet
        foodflix/
        │── index.html        # Structure de la page
        │── css/
        │   ├── reset.css     # Reset de base
        │   ├── style.css     # Styles principaux
        │── js/
        │   └── script.js     # Logique front (API, modal, recherche, etc.)
        │── assets/           # Images, icônes, etc.
        │── README.md         # Documentation

⚙️ Installation & Lancement

Cloner le projet :

git clone https://github.com/ton-compte/foodflix.git
cd foodflix


Obtenir une clé API TMDB :

Crée un compte sur TMDB

Récupère ta clé API depuis le tableau de bord développeur

Configurer la clé API dans js/script.js :

const API_KEY = "TA_CLE_API";


Lancer le projet :
Ouvre index.html dans ton navigateur.

📌 Améliorations possibles

Ajouter un système de favoris ("Ma liste").

Intégrer des filtres (par genre, année, pays).

Ajouter un vrai backend pour gérer les utilisateurs.

Améliorer l’accessibilité (clavier, ARIA, contrastes).
