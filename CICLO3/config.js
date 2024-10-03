const mongoose = require('mongoose');

async function dbconnect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/restaurants');
      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      console.log('Error conectando a la base de datos', error);
    }
  }

module.exports = dbconnect