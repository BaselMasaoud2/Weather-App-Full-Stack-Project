const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const axios = require('axios'); // הוספת ה-import של axios
const citySchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String
});

const City = mongoose.model('City', citySchema);

module.exports = City;
