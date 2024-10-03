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


// Obtener restaurantes con filtros
exports.filterRestaurants = async (req, res) => {
  const { name, cuisine, longitude, latitude, distance } = req.query;

  // Inicializa un objeto para las condiciones de búsqueda
  const matchConditions = {};

  // Agrega condiciones si los parámetros están presentes
  if (name) {
    matchConditions.name = { $regex: name, $options: 'i' };
  }
  if (cuisine) {
    matchConditions.cuisine = { $regex: cuisine, $options: 'i' };
  }

  // Verifica si se proporcionaron coordenadas para la búsqueda geoespacial
  if (longitude && latitude) {
    // Configura la búsqueda geoespacial
    const geoConditions = {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        distanceField: 'dist.calculated',
        maxDistance: distance ? parseFloat(distance) : 10000,
        spherical: true,
        query: matchConditions,
      },
    };

    try {
      const restaurants = await Restaurant.aggregate([
        geoConditions,
        {
          $project: {
            name: 1,
            cuisine: 1,
            address: 1,
            'dist.calculated': 1,
          },
        },
        {
          $sort: { 'dist.calculated': 1 },
        },
      ]);

      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // Si no se proporcionan coordenadas, solo buscar sin filtro geoespacial
    try {
      const restaurants = await Restaurant.find(matchConditions);
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
