export default class Day {
  constructor(date, feels, temp, weather) {
    this.date = new Date(date * 1000).toLocaleDateString();
    this.feelsLike = feels;
    this.temp = temp;
    this.weather = weather;
  }

  getWeather() {
    return this.weather[0].description;
  }

  getDayNigthTemp() {
    return [Math.round(this.temp.day), Math.round(this.temp.night)];
  }

  getFeelsLikeDayNightTemp() {
    return [Math.round(this.feelsLike.day), Math.round(this.feelsLike.night)];
  }
}
