export default class Day {
  constructor(date, feels, temp, weather, unit = '°C') {
    this.date = new Date(date * 1000).toLocaleDateString();
    this.feelsLike = feels;
    this.temp = temp;
    this.weather = weather;
    this.unit = unit;
  }

  getWeather() {
    return this.weather[0].description;
  }

  getDayNigthTemp() {
    const day = Math.round(this.temp.day) + this.unit;
    const night = Math.round(this.temp.night) + this.unit;
    return [day, night];
  }

  getFeelsLikeDayNightTemp() {
    const day = Math.round(this.feelsLike.day) + this.unit;
    const night = Math.round(this.feelsLike.night) + this.unit;
    return [day, night];
  }
}
