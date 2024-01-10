import Model from './model.js';
import Renderer from './render.js';

const model = new Model();
const renderer = new Renderer(model);
async function init() {
  await model.getCitiesFromServer();
  renderer.renderSavedCities();
}

document.addEventListener('DOMContentLoaded', init);
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const cityName = document.getElementById('search-input').value;
    if (cityName) {
      const cityData = await model.getCityData(cityName);
      renderer.renderCityData(cityData);
    }
  });
}

const saveBtn = document.getElementById('save-btn');
if (saveBtn) {
  saveBtn.addEventListener('click', async () => {
    const cityName = document.getElementById('search-input').value;
    if (cityName) {
      const cityData = await model.getCityData(cityName);
      await model.saveCityToDB(cityData);
      renderer.renderSavedCities();
    }
  });
}
const removeBtn = document.getElementById('remove-btn');
if (removeBtn) {
  removeBtn.addEventListener('click', async () => {
    const cityName = document.getElementById('search-input').value;
    if (cityName) {
      await model.deleteCityFromDB(cityName);
      renderer.renderSavedCities();
    }
  });
}
async function searchCity() {
  const cityName = document.getElementById('search-input').value;

  try {
    const response = await fetch(`/api/cities/${cityName}`);
    const cityData = await response.json();
    
    console.log('City Data:', cityData); 
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
      <div class="weather-card">
        <h2 class="city-name">${cityData.name}</h2>
        <p class="temperature">Temperature: ${cityData.temperature} K</p>
        <p class="weather-condition">Condition: ${cityData.condition}</p>
      </div>
    `;
  } catch (error) {
    console.error('Error searching city:', error.message);
  }
}
