import { CronJob } from 'cron';
import { updateNotFinishedRounds } from '../services/round';
import { Logger } from 'tslog';

const logger: Logger = new Logger();

export const roundJob = new CronJob('* */5 * * * *', async () => {
    logger.info('Updating pending rounds');
    await updateNotFinishedRounds();
}, null, true, 'America/Los_Angeles');