import chalk from 'chalk';
import dedent from 'dedent-js';
import {getIcon} from './api.service.js';

const printError = (error) => {
    console.log(`${chalk.bgRed.black('ERROR')} ${error}`);
};

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen.black('SUCCESS')} ${message}`);
};

const printHelp = () => {
    console.log(
        dedent`
            ${chalk.bgCyan.black(' HELP ')}
            Without params - get weather
            -s [CITY] for setting up city
            -h for help
            -t [API_KEY] for token saving
        `)
}

const printWeather = async (weather) => {
    const icon = getIcon(weather?.weather?.[0]?.icon);

    console.log(
        dedent`
            ${chalk.bgGreen.black(' WEATHER ')} Weather in ${weather?.name}
            ${icon} ${weather?.weather?.[0]?.description}
            Temperature: ${weather?.main?.temp} (feels like ${weather?.main?.feels_like})
            Humidity: ${weather?.main?.humidity}%
            Wind: ${weather?.wind?.speed}
        `)
}

export { printSuccess, printError, printHelp, printWeather };