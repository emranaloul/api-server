'use strict';

const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

const ClothesModel = mongoose.model('Clothes', clothesSchema );

module.exports = ClothesModel;