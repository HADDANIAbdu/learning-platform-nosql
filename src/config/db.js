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
    mongoClient = new MongoClient(uri);
    
    await mongoClient.connect();
    

    db = mongoClient.db(database);
    return db;
  } catch(error){
    setTimeout(() => {
      connectMongo();
    }, 5000);

    throw error;
  }
}

async function closeMongo() {
    try{
      await mongoClient.close();
    }catch(error){
      throw error;
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
      if(!redisClient.isOpen) await redisClient.connect();
      return redisClient;
    } catch (error) {
      setTimeout(() => {
        connectRedis
      }, 5000);
      console.log("error redis");
      throw error;
    }
}

async function closeRedis(){
  try{
    await redisClient.quit();
  }catch(error){
    throw error;
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  closeMongo,
  closeRedis,
};