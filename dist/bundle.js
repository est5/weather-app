(()=>{"use strict";var __webpack_modules__={449:()=>{eval("\n;// CONCATENATED MODULE: ./src/js/model.js\nclass Day {\n  constructor(date, feels, temp, weather) {\n    this.date = new Date(date * 1000).toLocaleDateString();\n    this.feelsLike = feels;\n    this.temp = temp;\n    this.weather = weather;\n  }\n\n  getWeather() {\n    return this.weather[0].description;\n  }\n\n  getDayNigthTemp() {\n    return [Math.round(this.temp.day), Math.round(this.temp.night)];\n  }\n\n  getFeelsLikeDayNightTemp() {\n    return [Math.round(this.feelsLike.day), Math.round(this.feelsLike.night)];\n  }\n}\n\n;// CONCATENATED MODULE: ./src/js/main.js\n\n\nconst API = '85b84c5130087fb07ff265a3876b3a1d';\nasync function getWeekWeather(city, units) {\n  const geo = await getGeo(city);\n\n  try {\n    const fetchData = await fetch(\n      `https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lat}&lon=${geo.lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${API}`\n    );\n    const data = await fetchData.json();\n\n    createWeekWeather(data.daily);\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function getGeo(city) {\n  try {\n    const fetchData = await fetch(\n      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API}`\n    );\n\n    const data = await fetchData.json();\n\n    const lat = data[0].lat;\n    const lon = data[0].lon;\n\n    return { lat, lon };\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nfunction createWeekWeather(data) {\n  const week = [];\n\n  for (let i = 0; i < data.length; i++) {\n    const date = data[i].dt;\n    const feels = data[i].feels_like;\n    const temp = data[i].temp;\n    const weather = data[i].weather;\n    const d = new Day(date, feels, temp, weather);\n    week.push(d);\n    console.log(d.getDayNigthTemp());\n  }\n\n  displayWeek(week);\n}\n\nfunction displayWeek(week) {\n  const div = document.querySelector('.week-display');\n\n  for (let i = 0; i < week.length; i++) {\n    const wrapper = document.createElement('div');\n    wrapper.classList.add('day-wrapper');\n    const date = createDatePara(week[i].date);\n    const weather = createWeatherPara(week[i].getWeather());\n    const temp = createTemp(week[i].getDayNigthTemp());\n    const feelsTemp = createTemp(week[i].getFeelsLikeDayNightTemp(), true);\n\n    wrapper.appendChild(date);\n    wrapper.appendChild(weather);\n    wrapper.appendChild(temp);\n    wrapper.appendChild(feelsTemp);\n\n    div.appendChild(wrapper);\n  }\n}\n\nfunction createParagraph() {\n  const data = document.createElement('p');\n\n  data.classList.add('day-info');\n  return data;\n}\n\nfunction createDatePara(date) {\n  const p = createParagraph();\n  p.textContent = 'Date: ' + date;\n  return p;\n}\n\nfunction createWeatherPara(weather) {\n  const p = createParagraph();\n  p.textContent += weather;\n  return p;\n}\n\nfunction createTemp(temp, feels = false) {\n  const p = createParagraph();\n  const [day, night] = temp;\n\n  if (feels) {\n    p.textContent = 'Feels like: \\n';\n    p.textContent += 'Day: ' + day + ' Night: ' + night;\n    return p;\n  }\n\n  p.textContent = 'Day: ' + day + ' Night: ' + night;\n  return p;\n}\n\ngetWeekWeather('london', 'metric');\n\n\n//# sourceURL=webpack://weather-app/./src/js/main.js_+_1_modules?")}},__webpack_exports__={};__webpack_modules__[449]()})();