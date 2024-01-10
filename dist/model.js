
export default class Model {
  constructor() {
    this.cities = [];
  }
  async getCitiesFromServer() {
    try {
        const response = await fetch('/api/cities');
        const cities = await response.json();
        this.cities = cities;
    } catch (error) {
        console.error('Error fetching cities from server:', error.message);
    }
}
  async getCityData(cityName) {
    try {
      const response = await fetch(`/api/cities/${cityName}`);
      const cityData = await response.json();
      console.log('City data from server:', cityData); 
      return cityData;
    } catch (error) {
      console.error('Error fetching city data from server:', error.message);
      return { name: cityName, temperature: 'N/A', condition: 'N/A' };
    }
  }
  async saveCityToDB(cityData) {
    try {
      await fetch('/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityData),
      });
    } catch (error) {
      console.error('Error saving city to DB:', error.message);
    }
  }

  async deleteCityFromDB(cityName) {
    try {
      await fetch(`/api/cities/${cityName}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting city from DB:', error.message);
    }
  }
}
