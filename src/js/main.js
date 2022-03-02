import Day from './model';

const API = '85b84c5130087fb07ff265a3876b3a1d';
async function getWeekWeather(city, units) {
  const geo = await getGeo(city);

  try {
    const fetchData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lat}&lon=${geo.lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${API}`
    );
    const data = await fetchData.json();

    createWeekWeather(data.daily);
  } catch (e) {
    console.log(e);
  }
}

async function getGeo(city) {
  try {
    const fetchData = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API}`
    );

    const data = await fetchData.json();

    const lat = data[0].lat;
    const lon = data[0].lon;

    return { lat, lon };
  } catch (e) {
    console.log(e);
  }
}

function createWeekWeather(data) {
  const week = [];

  for (let i = 0; i < data.length; i++) {
    const date = data[i].dt;
    const feels = data[i].feels_like;
    const temp = data[i].temp;
    const weather = data[i].weather;
    const d = new Day(date, feels, temp, weather);
    week.push(d);
    console.log(d.getDayNigthTemp());
  }

  displayWeek(week);
}

function displayWeek(week) {
  const div = document.querySelector('.week-display');

  for (let i = 0; i < week.length; i++) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('day-wrapper');
    const date = createDatePara(week[i].date);
    const weather = createWeatherPara(week[i].getWeather());
    const temp = createTemp(week[i].getDayNigthTemp());
    const feelsTemp = createTemp(week[i].getFeelsLikeDayNightTemp(), true);

    wrapper.appendChild(date);
    wrapper.appendChild(weather);
    wrapper.appendChild(temp);
    wrapper.appendChild(feelsTemp);

    div.appendChild(wrapper);
  }
}

function createParagraph() {
  const data = document.createElement('p');

  data.classList.add('day-info');
  return data;
}

function createDatePara(date) {
  const p = createParagraph();
  p.textContent = 'Date: ' + date;
  return p;
}

function createWeatherPara(weather) {
  const p = createParagraph();
  p.textContent += weather;
  return p;
}

function createTemp(temp, feels = false) {
  const p = createParagraph();
  const [day, night] = temp;

  if (feels) {
    p.textContent = 'Feels like: \n';
    p.textContent += 'Day: ' + day + ' Night: ' + night;
    return p;
  }

  p.textContent = 'Day: ' + day + ' Night: ' + night;
  return p;
}

getWeekWeather('london', 'metric');
