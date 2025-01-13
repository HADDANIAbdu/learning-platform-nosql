// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Le point d'entrée de l'application devrait inclure la configuration de la base de données,
// la configuration des middlewares et la gestion des routes


// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: L'utilisation d'une fonction async startServer() pour effectuer tous le initialisations nécessaires
// avant de démarer le serveur .


const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    const database = await db.connectMongo();
    await db.connectRedis();

    // TODO: Configurer les middlewares Express
    app.use(express.json());

    // TODO: Monter les routes
    app.use('/courses', courseRoutes);

    // TODO: Démarrer le serveur
    const port = config.port;
    app.listen(port, () => {
      console.log('Server Running in port ', port);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  try{
    await db.closeRedis();
    await db.closeMongo();
    process.exit(0);
  }catch(error){
    process.exit(1);
  }
});

startServer();