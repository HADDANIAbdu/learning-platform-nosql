# Projet de fin de module NoSQL

Ce projet consiste à créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne.

## Installation des dépendances :

Durant ce projet, J'ai utilisé une ensemble des dépendances à savoir :
   ### 1- Express :
Framework web minimaliste et flexible pour créer des applications et API backend rapidement.
   ```bash 
      npm install express
   ```
   ### 2- Dotenv :
Permet de charger des variables d'environnement à partir d'un fichier .env dans process.env.
   ```bash 
      npm install dotenv
   ```
   ### 3- Mongodb :
Driver officiel pour interagir avec une base de données MongoDB .
   ```bash 
      npm install mongodb
   ```
   ### 4- Redis :
Client Redis pour interagir avec Redis en tant que cache ou base de données rapide en mémoire.
   ```bash 
      npm install mongodb
   ```

Après l'installation des dépendances , Il suffit de specifier les variables d'environnement nécessaire pour 
configurer la connexion avec les base de données Mongodb et Redis et aussi le port à utiliser par le serveur .

## La structure du projet :
Ce projet est structuré de facon à respecter les bonnes pratiques de développement, en séparant la logique
métier des routes, en créant un module séparé pour les connexions aux bases de données et en séparant
la création des services pour garantir et respecter l'un des 5 principes SOLID de l'implémentation
POO (Single Responsability) .
   ### 1- les services de connexion :
les services de connexion permettant de gérer les transactions avec les base de données redis et mongodb, pour le cache des données, pour l'insertion et la recherche des documents .
   ### 2- les controleurs :
les controleurs permettant de gérer la logique métier à éxecuter lorsqu'un une route est appelée. dans ce projet
j'ai utilisé deux controleur , l'un pour les routes des étudiants et l'autre pour les routes des courses .
   ### 3- les routes :
pour ce projet j'ai utilisé 5 routes dont 4 pour les opérations CRUD des courses et une pour quelques statistiques des courses .
   ```javascript
      //route pour la création d'un nouveau document course 
      router.post('/create', courseController.createCourse);
      //route pour l'affichage d'un nouveau document course 
      router.get('/:id', courseController.getCourse);
      //route pour la modification d'un nouveau document course 
      router.put('/update/:id', courseController.updateCourse);
      //route pour la suppression d'un nouveau document course 
      router.delete('/delete/:id', courseController.deleteCourse);
      //route pour l'affichage des statistiques d'un nouveau document course 
      router.get('/stats', courseController.getCourseStats);
   ```
   ![Requests](/assets/requests/image.png)    

## L'implémentation des endpoints :
Durant la réalisation de ce projet, J'ai utilisé Postman desktop pour créer les requetes et voir les responses de chaque requete.
Dans cette partie quelques images illustre bien les requetes et leurs response :
   ### 1- la création d'un nouveau course :
Création d'un course en utilisant une requete post sur postman :
   ![create new course](/assets/create/create_postman.png) 
la vérification sur mongodb :
   ![course in mongodb](/assets/create/create_mongodb.png)
la vérification sur redis :
   ![course in redis](/assets/create/create_redis.png)

   ### 1- l'affichage d'un course :
Afficher le course ajouter en utilisant une requete get : 
   ![show course in postman](/assets/read/image.png)

   ### 1- la modéfication d'un course :
Modifier le course en utilisant une requete put : 
   ![update course](/assets/update/update_postman.png) 
la vérification sur mongodb :
   ![updated course in mongodb](/assets/update/update_mongodb.png)
la vérification sur redis :
   ![updated course in redis](/assets/update/update_redis.png)

   ### 1- la suppression d'un course :
Supprimer un course en utilisant une requete delete :
   ![delete course ](/assets/delete/image.png)

   ### 1- l'affichage des statistiques d'un course :
Afficher les statistiques d'un course : 
   ![course stats](/assets/stats/image.png)