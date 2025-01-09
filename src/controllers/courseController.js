// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: un contrôleur est responsable de gérer la logique à éxecuter lorsqu'un une route est appelée. 
//          une route c'est une point d'accès pour accéder à un logique correspondant via un lien ou un URL.


// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
};