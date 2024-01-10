const express = require('express');
const router = express.Router();
const axios = require('axios');
const City = require('../model/City');
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities from DB:', error.message);
    res.status(500).json({ error: 'Failed to fetch cities from DB' });
  }
});
router.get('/cities/:cityName', async (req, res) => {
    const cityName = req.params.cityName;
  
    try {
      const apiKey = '88951202b5fd20254aedd3548ecaf7dc';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
  
      console.log('API response:', response.data); 
  
      const cityData = response.data;
  
      // Additional code...
      const formattedCityData = {
        name: cityData.name,
        temperature: cityData.main.temp, 
        condition: cityData.weather[0].main, 
      };
  
      res.json(formattedCityData);
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from API' });
    }
  });
router.post('/cities', async (req, res) => {
  const newCityData = req.body;

  try {
    const newCity = await City.create(newCityData);
    res.json(newCity);
  } catch (error) {
    console.error('Error saving city to DB:', error.message);
    res.status(500).json({ error: 'Failed to save city to DB' });
  }
});
router.delete('/cities/:cityName', async (req, res) => {
  const cityName = req.params.cityName;

  try {
    const deletedCity = await City.findOneAndDelete({ name: cityName });
    res.json(deletedCity);
  } catch (error) {
    console.error('Error deleting city from DB:', error.message);
    res.status(500).json({ error: 'Failed to delete city from DB' });
  }
});

module.exports = router;
