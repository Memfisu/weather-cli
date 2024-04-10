import { getArgs } from './helpers/args.js';
import { printSuccess, printError, printHelp, printWeather } from './services/log.service.js';
import {getKeyValue, saveKeyValue} from './services/storage.service.js';
import {PARAMS} from './helpers/constants.js';
import {getWeather} from './services/api.service.js';

const saveParam = async (type, value) => {
    if (!value.length) {
        printError(`${type} is required`);
        return;
    }
    try {
        await saveKeyValue(PARAMS[type], value);
        printSuccess(`${type} has been saved`);
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = await getKeyValue(PARAMS.city);

        if (!city) {
            throw new Error('City is not found, please use -s [CITY]');
        }

        const weather = await getWeather(city);
        await printWeather(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('The city is incorrect');
        } else if (e?.response?.status === 401) {
            printError('Token is incorrect');
        } else {
            printError(e?.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        await saveParam(PARAMS.city, args.s);
    }

    if (args.t) {
        await saveParam(PARAMS.token, args.t);
    }

    await getForecast();
};

initCLI();