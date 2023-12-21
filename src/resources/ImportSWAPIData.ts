import logger from '@src/shared/Logger';
import axios, { AxiosResponse } from 'axios';
import People from '@src/models/People';
import Film from '@src/models/Film';
import Starship from '@src/models/Starship';
import Planet from '@src/models/Planet';
import Species from '@src/models/Species';
import Vehicle from '@src/models/Vehicle';

/**
 * The above function is an asynchronous function that fetches data from a given URL using the axios
 * library in TypeScript.
 * @param {string} url - The `url` parameter is a string that represents the URL from which you want to
 * fetch data.
 * @returns The function `fetchData` returns a Promise that resolves to an `AxiosResponse` object.
 */
async function fetchData(url: string): Promise<AxiosResponse> {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * The function fetchMultipleUrls takes an array of URLs and returns a promise that resolves to an
 * array of AxiosResponse objects.
 * @param {string[]} urls - An array of strings representing the URLs that need to be fetched.
 * @returns a Promise that resolves to an array of AxiosResponse objects.
 */
async function fetchMultipleUrls(urls: string[]): Promise<AxiosResponse[]> {
    try {
        const responses = await Promise.all(urls.map(url => fetchData(url)));
        return responses;
    } catch (error) {
        throw error;
    }
}

/**
 * The function `fetchDataAndUpdateDB` fetches data from the Star Wars API (SWAPI) and stores it in a
 * MongoDB database.
 */
async function fetchDataAndUpdateDB() {
    try {
        logger.info('Running SWAPI data update job...');
        let nextUrls: string[] = [];
        await axios.get('https://swapi.dev/api/').then(async (data: any) => {
            nextUrls = Object.values(data.data);
        });
        while (nextUrls.length > 0) {
            await fetchMultipleUrls(nextUrls)
                .then(responses => {
                    nextUrls = [];
                    responses.forEach(response => {
                        if (String(response.config.url).includes('people')) {
                            response.data.results.forEach(async (doc: any) => {
                                await People.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (String(response.config.url).includes('film')) {
                            response.data.results.forEach(async (doc: any) => {
                                await Film.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (String(response.config.url).includes('planet')) {
                            response.data.results.forEach(async (doc: any) => {
                                await Planet.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (String(response.config.url).includes('species')) {
                            response.data.results.forEach(async (doc: any) => {
                                await Species.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (String(response.config.url).includes('starship')) {
                            response.data.results.forEach(async (doc: any) => {
                                await Starship.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (String(response.config.url).includes('vehicle')) {
                            response.data.results.forEach(async (doc: any) => {
                                await Vehicle.updateOne({ url: doc.url }, doc, { upsert: true });
                            })
                        }
                        if (response.data.next) {
                            nextUrls.push(response.data.next);
                        }
                    });
                })
        }

        logger.info('SWAPI Data Updated in MongoDB Database.');
    } catch (error) {
        logger.error('Error updating data:', error);
    }
}

fetchDataAndUpdateDB(); // Execute the function immediately (for initial data load)

export default fetchDataAndUpdateDB;
