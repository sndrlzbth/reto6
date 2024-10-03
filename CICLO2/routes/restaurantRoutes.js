// routes/restaurantRoutes.js
const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

// Crear un nuevo restaurante
router.post('/', restaurantController.createRestaurant);

// Obtener todos los restaurantes
router.get('/', restaurantController.getAllRestaurants);

// Obtener un restaurante por ID
router.get('/:id', restaurantController.getRestaurantById);

// Actualizar un restaurante por ID
router.put('/:id', restaurantController.updateRestaurant);

// Eliminar un restaurante por ID
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
