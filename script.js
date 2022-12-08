const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=5c31cbbdef3aeccf566899e2d5a95918';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value;
	const URL = API_LINK + city + API_KEY + API_UNITS;

	{
		fetch(URL, {
			Authorization: 'Basic ',
		})
			.then(res => res.json())
			.then(data => {
				const temp = data.main.temp;
				temperature.innerHTML = Math.floor(temp) + ' °C';
				const hum = data.main.humidity;
				humidity.innerHTML = hum + ' %';
				cityName.innerHTML = city;

				const status = Object.assign({}, ...data.weather);
				console.log(status);
				weather.innerHTML = status.main;

				warning.textContent = '';
				input.value = '';

				if (status.id >= 200 && status.id < 300) {
					photo.setAttribute('src', 'img/thunderstorm.png');
				} else if (status.id >= 300 && status.id < 400) {
					photo.setAttribute('src', 'img/drizzle.png');
				} else if (status.id >= 500 && status.id < 600) {
					photo.setAttribute('src', 'img/rain.png');
				} else if (status.id >= 600 && status.id < 700) {
					photo.setAttribute('src', 'img/ice.png');
				} else if (status.id >= 700 && status.id < 800) {
					photo.setAttribute('src', 'img/fog.png');
				} else if (status.id === 800) {
					photo.setAttribute('src', 'img/sun.png');
				} else if (status.id > 800 && status.id < 900) {
					photo.setAttribute('src', 'img/cloud.png');
				} else {
					photo.setAttribute('src', 'img/unknown.png');
				}
			})
			.catch(() => {
				warning.textContent = 'Please enter a good city name';
			});
	}
};
getWeather();
button.addEventListener('click', getWeather);
