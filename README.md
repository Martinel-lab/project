# Projet : Liste de courses (Post-it/Discussions)

## Auteur
**François MARTINEL - Classe 44**
**-> Désolé mais je n'ai pas trouvé de camarades avec qui travailler alors j'ai réalisé ce projet seul, j'espère sincèrement que cela ne sera pas un problème pour vous. Cordialement.**

## Description
Ce projet permet:

1. De créer des listes.
2. De visualiser les listes.
3. D'ajouter des "messages" dans les listes.
4. De supprimer des listes et des messages.

L'application utilise une architecture en microservices conteneurisés via Docker.

---

## Structure du projet

```
project/
├── server/              # Code source du backend
│   ├── Dockerfile        # Conteneurisation du backend
│   └── index.js          # Serveur Express.js
│
├── client/             # Code source du frontend
│   ├── Dockerfile        # Conteneurisation du frontend
│   ├── src/              # Fichiers React (App.jsx, components, CSS)
│   └── vite.config.js    # Configuration de Vite
│
├── mysql_data/             # Clés...
│
├── docker-compose.yml    # Orchestration des services
└── README.md             # Documentation du projet
```

---

## Fonctionnalités

- **Listes** :
  - Création d'une liste.
  - Visualisation de toutes les listes.
  - Suppression d'une liste.

- **Messages** :
  - Ajout de messages dans une liste.
  - Visualisation des messages d'une liste.
  - Suppression d'un message.

---

## Technologies utilisées

1. **Backend** : Node.js (Express.js)
2. **Base de données** : MySQL
3. **Frontend** : React avec Vite
4. **Conteneurisation** : Docker et Docker Compose

---

## Installation et exécution

### Prérequis
- **Docker** et **Docker Compose** installés.

### Étapes
1. Clonez le dépôt :
   ```bash
   git clone <url-du-depot>
   cd project
   ```

2. Construisez et démarrez les services :
   ```bash
   docker-compose up --build
   ```

3. Accédez à l'application dans votre navigateur à l'adresse :
   ```
   http://localhost:80
   ```

---

## Endpoints de l'API

### Discussions
- **GET** `/discussions` : Récupère toutes les listes.
- **POST** `/discussions` : Crée une nouvelle liste.
  - Corps de la requête : `{ "title": "Nom de la liste" }`
- **DELETE** `/discussions/:id` : Supprime une liste (et ses messages).

### Messages
- **GET** `/discussions/:id/messages` : Récupère tous les messages d'une liste.
- **POST** `/messages` : Ajoute un message à une liste.
  - Corps de la requête : `{ "iddiscussion": <id>, "content": "Texte du message" }`
- **DELETE** `/messages/:id` : Supprime un message.

---

## Fonctionnement

### Backend
1. L'API REST est exposée via Express.js.
2. Les données sont stockées dans une base MySQL.

### Frontend
1. React est utilisé pour afficher la liste des listes et messages.
2. Les composants permettent d'interagir avec l'API pour créer, afficher et supprimer.

---

## Configuration des variables d'environnement

Créez un fichier `.env` avec les paramètres suivants :
```env
MYSQL_ROOT_PASSWORD=<password_root>
MYSQL_DATABASE=mydatabase
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
```

---

## Améliorations possibles

1. **Authentification** : Ajouter un système de connexion pour gérer les utilisateurs.
2. **UI/UX** : Intégrer un framework CSS comme Tailwind ou Bootstrap.
3. **Tests** : Ajouter des tests unitaires pour le backend et le frontend.

