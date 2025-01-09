// Question: Pourquoi créer des services séparés ?
// Réponse: cela permet de séparer le logique métier et respecter l'un des 5 principes SOLID de l'implémentation
// POO (Single Responsability)

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
};