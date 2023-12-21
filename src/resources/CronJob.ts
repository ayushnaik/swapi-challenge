import cron from 'node-cron';
import logger from '@src/shared/Logger';
import fetchDataAndUpdateDB from './ImportSWAPIData';

export function scheduleCronJob() {
    logger.info('Scheduling Cron Job...');
    cron.schedule('0 0 */5 * * *', async () => {
        await fetchDataAndUpdateDB();
    });
}

scheduleCronJob()