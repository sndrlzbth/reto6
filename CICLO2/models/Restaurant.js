const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    coord: [Number],
    street: String,
    zipcode: String,
  },
  borough: String,
  cuisine: String,
  grades: [
    {
      date: Date,
      score: Number,
    },
  ],
  comments: [
    {
      date: Date,
      comment: String,
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
  name: String,
  restaurant_id: String,
});

// Cambia 'Restaurant' por el nombre de la colección
const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants_collection');

module.exports = Restaurant;
