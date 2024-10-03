// controllers/restaurantController.js
const Restaurant = require('../models/Restaurant');

// Crear un nuevo restaurante
exports.createRestaurant = async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los restaurantes
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un restaurante por ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un restaurante por ID
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un restaurante por ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json({ message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
