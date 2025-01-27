// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : 1- utiliser des clès uniques pour chaque élement.
//           2- définir les expirations de cache  (TTL)
//           3- structurer les données pour garantir l'adaptabilité .


// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : 1- utiliser des noms de clés descriptifs.
//           2- éviter les clés trop longue.
//           3- ajouter des dates d'experations .

const db  = require("../config/db");

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try{
      const dataStr = JSON.stringify(data);
      const redisClient = await db.connectRedis();

      await redisClient.set(key, dataStr, { EX: ttl});
    }catch(error){
      throw error;
    }
}
  
module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
};