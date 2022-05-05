import * as fs from 'fs/promises';
import { Logger } from 'tslog';
import { Word } from '../entities/word';
import { dataSource } from '../database/connection';

const logger: Logger = new Logger();

export async function loadWords() {
    const letters = await fs.readFile('./words.txt', { encoding: 'utf-8' });
    const words = letters.split('\n');
    for (const word of words) {
        if (word && word.length > 0) {
            const newWord = new Word();
            newWord.word = word;
            newWord.length = word.length;
            await dataSource.manager.save(newWord);
            logger.debug(`Word saved:${JSON.stringify(newWord)}`);
        }
    }
}