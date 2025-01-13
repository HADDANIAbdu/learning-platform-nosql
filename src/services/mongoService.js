// Question: Pourquoi créer des services séparés ?
// Réponse: cela permet de séparer le logique métier et respecter l'un des 5 principes SOLID de l'implémentation
// POO (Single Responsability)

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try{
    if(!ObjectId.isValid(id)) throw new Error("Invalid id !");
    
    const objectId = ObjectId.createFromHexString(id);
    const document = await collection.findOne({_id: objectId});
    return document != null ? document : null;
  }catch(error){
    throw error;
  }
}

async function insertOne(collection, document) {
  try{
    const result = await collection.insertOne(document);
  }catch(error){
    throw error;
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne,
};