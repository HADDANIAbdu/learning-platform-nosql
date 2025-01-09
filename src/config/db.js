// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : cela permet de centraliser la gestion des connexions tout en facilitant la maintenance
// et la réutilisation .


// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 
// 1- écouter les événements de la fermeture comme ou les hooks pour fermer les connexion 
// lors d'un événement process.exit
// 2- gérer les erreurs pour fermer correctement les connexions en cas d'échec .

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
};