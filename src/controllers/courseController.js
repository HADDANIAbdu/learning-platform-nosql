// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: un contrôleur est responsable de gérer la logique à éxecuter lorsqu'un une route est appelée. 
//          une route c'est une point d'accès pour accéder à un logique correspondant via un lien ou un URL.


// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : cela permet de rendre le code plus modulaire et facilite la gestion des modifications .

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  const {title, description, category, duration, price, enrolledBy, stars, certificateLevel} = req.body;

  if(!title || !description || !category || !duration || !price || !enrolledBy || !stars || !certificateLevel){
    return res.status(400).json({
      status: "error",
      message: "all fields required"
    });
  }

  try {
    const newCourse = {_id: new ObjectId() ,title, description, category, duration, price, enrolledBy, stars, certificateLevel};

    const database = await db.connectMongo();
    const collection = database.collection("courses");

    await mongoService.insertOne(collection, newCourse);
    
    await redisService.cacheData(`course:${newCourse._id}`, newCourse, 3600);
    return res.status(201).json({
      status: "success",
      message: "Course added successfully !",
      data: newCourse
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error !"
    });
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const {title, description, category, duration, price, enrolledBy, stars, certificateLevel} = req.body;

  if(!title || !description || !category || !duration || !price || !enrolledBy || !stars || !certificateLevel){
    return res.status(400).json({
      status: "error",
      message: "all fields required"
    });
  }
  try {
    const database = await db.connectMongo();
    const collection = database.collection("courses");
    const filter = { _id: ObjectId.createFromHexString(id)};
    const updateCourse = {
      $set: {
        title: title, 
        description: description, 
        category: category, 
        duration: duration, 
        price: price,
        enrolledBy: enrolledBy,
        stars: stars,
        certificateLevel: certificateLevel,
      },
    };
    const result = await collection.updateOne(filter, updateCourse);

    if(result.modifiedCount > 0){
      const course = await mongoService.findOneById(collection, id);

      const redisClient = await db.connectRedis();
      await redisClient.del(`course:${id}`);
      await redisService.cacheData(`course:${id}`, course, 3600);
      return res.status(200).json({
        status: "success",
        message: "course updated successfully !",
        data: course
      });
    }
    return res.status(200).json({
      status: "error",
      message: "Cannot update course !"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error !"
    });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const database = await db.connectMongo();
    const collection = database.collection("courses");
    const query = {_id: ObjectId.createFromHexString(id)};

    const result = await collection.deleteOne(query);
    if(result.deletedCount > 0){
      const redisClient = await db.connectRedis();
      await redisClient.del(`course:${id}`);

      return res.status(200).json({
        status: "success",
        message: "course deleted successfully !",
      });
    }
    return res.status(200).json({
      status: "error",
      message: "Cannot delete course !"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error !"
    });
  }
}

async function getCourse(req, res) {
  const { id } = req.params;
  try {
    const redisClient = await db.connectRedis();
    const Cachedcourse = await redisClient.get(`course:${id}`);

    if(Cachedcourse){
      const course = JSON.parse(Cachedcourse);

      await redisService.cacheData(`course:${course._id}`, course, 3600);

      return res.status(200).json({
        status: 'success',
        message: 'course found successfully !',
        data: course
      });
    }
    else{
      const database = await db.connectMongo();
      const collection = database.collection("courses");
      const course = await mongoService.findOneById(collection, id);
      if(course) return res.status(200).json({
        status: 'success',
        message: 'course found successfully !',
        data: course
      });
      else return res.status(200).json({
        status: 'error',
        message: 'cannot found course !'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error !"
    });
  }
}

async function getCourseStats(req, res) {
  const { id } = req.params;
  try {
    const redisClient = await db.connectRedis();
    const Cachedcourse = await redisClient.get(`course:${id}`);

    if(Cachedcourse){
      const course = JSON.parse(Cachedcourse);
      const stats = {
        enrolledBy: course.enrolledBy,
        stars: course.stars,
        certificateLevel: course.certificateLevel,
      };
      await redisService.cacheData(`course:${course._id}`, course, 3600);

      return res.status(200).json({
        status: 'success',
        message: 'stats found successfully !',
        data: stats
      });
    }
    else{
      const database = await db.connectMongo();
      const collection = database.collection("courses");

      const projection = {
        enrolledBy: 1, 
        stars: 1,
        certificateLevel: 1, 
      };
      const query = { _id: ObjectId.createFromHexString(id)};
      const stats = collection.findOne(query, projection);

      if(courseStats) return res.status(200).json({
        status: 'success',
        message: 'stats found successfully !',
        data: stats
      });
      return res.status(200).json({
        status: 'success',
        message: 'no stats found successfully !'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error !"
    });
  }
}
// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourseStats
};