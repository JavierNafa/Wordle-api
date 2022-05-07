import * as _ from 'lodash';
import { dataSource } from '../database/connection';
import { Round } from '../entities/round';
import { Word } from '../entities/word';

const roundRepository = dataSource.getRepository(Round);
const wordRepository = dataSource.getRepository(Word);

export async function updateNotFinishedRounds() {

    const rounds = await roundRepository.createQueryBuilder('rounds')
        .where('rounds.attempts >= :attempts', { attempts: 5 })
        .andWhere('rounds.finished = :finished', { finished: false })
        .orWhere("age(now(), rounds.updated_date) >= '5 minutes'")
        .andWhere('rounds.finished = :finished', { finished: false })
        .getMany();

    if (rounds && rounds.length > 0) {
        for (const round of rounds) {
            round.finished = true;
        }
        await roundRepository.save(rounds);
    }
}

export async function startRound(userUuid: string) {

    let word = await wordRepository.createQueryBuilder('words')
        .leftJoin('words.rounds', 'rounds')
        .where('rounds.word_uuid IS NULL')
        .andWhere('words.length = :length', { length: 5 })
        .getOne();

    if (!word) {
        word = await wordRepository.findOneBy({ length: 5 });
    }

    const round = new Round();
    round.userUuid = userUuid;
    round.wordUuid = word.uuid;
    return await roundRepository.save(round);
}

export async function updateRound(userUuid: string, roundUuid: string, word: string) {

    const round = await roundRepository.createQueryBuilder('rounds')
        .innerJoinAndSelect('rounds.word', 'words')
        .where('rounds.uuid = :uuid', { uuid: roundUuid })
        .andWhere('rounds.user_uuid = :userUuid', { userUuid })
        .andWhere('rounds.attempts < :attempts', { attempts: 5 })
        .andWhere('rounds.finished = :finished', { finished: false })
        .andWhere("age(now(), rounds.updated_date) < '5 minutes'")
        .getOne();

    if (round) {
        const correctWord = round.word.word.toUpperCase();
        word = word.toUpperCase();

        let isCorrect = false;
        let letters: any[] = [] as any;

        if (word === correctWord) {
            round.winner = true;
            round.finished = true;
            isCorrect = true;
        } else {
            const separatedUserLetters = [...word];
            const separatedCorrectLetters = [...correctWord];
            for (let i = 0; i < separatedUserLetters.length; i++) {
                const userLetter = separatedUserLetters[i];
                const correctLetter = separatedCorrectLetters[i];
                if (userLetter === correctLetter) {
                    letters.push({ letter: userLetter, value: 1 });
                    separatedUserLetters[i] = null;
                    separatedCorrectLetters[i] = null;
                }
            }
            const correctLetters = separatedUserLetters.filter(l => l !== null && separatedCorrectLetters.includes(l));
            const incorrectLetters = separatedUserLetters.filter(l => l !== null && !separatedCorrectLetters.includes(l));

            letters.push(...mapLetters(correctLetters, 2));
            letters.push(...mapLetters(incorrectLetters, 3));
        }
        round.attempts = round.attempts + 1;
        await roundRepository.save(round);
        return { isCorrect, attempts: round.attempts, letters, word: round.attempts === 5 || round.winner ? correctWord : '' };
    }
    return null;
}

function mapLetters(letters: string[], value: number) {
    return letters.map((l) => { return { letter: l, value: value } });
}