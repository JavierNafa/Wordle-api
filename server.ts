import 'dotenv/config';
import { Logger } from 'tslog';
import { dataSource } from './src/database/connection';
import app from './app';
import { loadWords } from './src/utils/loader';

const { API_PORT: port, LOAD_DATA: loadData } = process.env;
const logger: Logger = new Logger();

app().listen(port, async () => {
    logger.info('Running');
    await dataSource.initialize();
    logger.info('connected to the database');
    if (loadData === 'true') {
        logger.info('Loading words');
        await loadWords();
    }
});