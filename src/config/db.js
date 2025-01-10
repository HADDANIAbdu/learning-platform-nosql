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
  
  const uri = config.mongodb.uri;
  const database = config.mongodb.dbName;

  try{
    mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    await mongoClient.connect();

    db = mongoClient.db(database);

    return db;
  } catch(error){
    setTimeout(() => {
      connectMongo();
    }, 5000);

  } finally{
    await mongoClient.close();
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries

  redisClient = redis.createClient({
    url: config.redis.uri
  });

  try {
    redisClient.on("connect", () => {
      console.log("connection successed !");
    });

    redisClient.on("error", (error) => {
      console.log("Erreur connecting to redis !, ", error.message);
    });

    await redisClient.connect();

    return redisClient;
  } catch (error) {
    setTimeout(() => {
      connectRedis
    }, 5000);
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis
};