import { getKeyValue } from './storage.service.js';
import {PARAMS} from '../helpers/constants.js';
import axios from 'axios';

export const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀';
        case '02':
            return '🌤';
        case '03':
            return '☁';
        case '04':
            return '☁';
        case '09':
            return '🌧';
        case '10':
            return '🌦';
        case '11':
            return '⛈';
        case '13':
            return '🌨';
        case '50':
            return '🌫';
    }
}

export const getWeather = async (city) => {
    const token = await getKeyValue(PARAMS.token);

    if (!token) {
        throw new Error('API key is not found, please use -t [API_KEY]');
    }

    const { data: geoData } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    });
    const { lat, lon } = geoData?.length && geoData?.[0];

    const { data: weatherData } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: token,
            lang: 'eng',
            units: 'metric'
        }
    });

    return weatherData;
}