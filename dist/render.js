export default class Renderer {
  constructor(model) {
    this.model = model;
    this.weatherContainer = document.getElementById('weather-container');
    this.searchResults = document.getElementById('search-results');
  }
  renderSavedCities() {
    const citiesHTML = this.model.cities.map(city => `<li>${city.name}</li>`).join('');
    this.weatherContainer.innerHTML = `
      <div>
        <h2>Saved Cities</h2>
        <ul>${citiesHTML}</ul>
      </div>
    `;
  }
  renderCityData(cityData) {
    console.log(cityData);
    const container = document.getElementById('weather-container');

    const conditionIcons = {
        'Clear': 'https://cdn-icons-png.flaticon.com/512/6122/6122561.png',
        'Clouds': 'https://cdn-icons-png.flaticon.com/512/6122/6122714.png',
        'Partly Cloudy': 'https://www.clipartmax.com/png/middle/129-1293850_download-icon-mostly-cloudy-weather-icon.png',
        // Add more conditions as needed
    };
    const iconURL = conditionIcons[cityData.condition] || 'https://example.com/default.png';
    container.innerHTML = `
        <div class="weather-card">
            <span class="city-name">${cityData.name}</span><br>
            <span class="temperature">Temperature: ${cityData.temperature} K</span><br>
            <span class="condition">Condition: ${cityData.condition}</span>
            <img src="${iconURL}" alt="${cityData.condition} icon" class="condition-icon">
            <div class="btn-container">
            <button class="add-temperature-btn" onclick="addTemperature('${cityData.name}')">+</button>
            <button class="remove-temperature-btn" onclick="removeTemperature('${cityData.name}')">-</button>
            </div>
          
        </div>
    `;
}

  renderSearchResults(searchResults) {
    const resultsHTML = searchResults.map(result => `
      <div class="weather-card">
        ${result.name}<br>
        Temperature: ${result.temp} K<br>
        Condition: ${result.condition}<br>
      </div>
    `).join('');

    this.searchResults.innerHTML = `
      <div>
        <h2>Search Results</h2>
        ${resultsHTML}
      </div>
    `;
  }

  logCityData(cityData) {
    console.log(cityData);
  }
}
