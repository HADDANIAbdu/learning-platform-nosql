// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : pour structurer le code de manière professionnelle, le rendre plus lisible et simple à comprendre .


// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 1- regrouper les routes par fonctionalité .
//          2- utiliser un fichier centrale pour l'ensemble des routes .
//          3- ajouter des prefixes compatibles à les fonctionalités .

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/create', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);
router.get('/stats/:id', courseController.getCourseStats);

module.exports = router;