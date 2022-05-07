import { dataSource } from '../database/connection';
import { User } from '../entities/user';
import { Round } from '../entities/round';
import { Word } from '../entities/word';

const userRepository = dataSource.getRepository(User);
const roundRepository = dataSource.getRepository(Round);
const wordRepository = dataSource.getRepository(Word);

export async function getStatsByUserUuid(userUuid: string) {
    const user = await userRepository.findOneBy({ uuid: userUuid });
    if (user) {
        const rounds = await roundRepository.findBy({ userUuid });
        let roundsWon = 0;
        let totalRounds = 0;
        if (rounds) {
            roundsWon = rounds.filter(r => r.winner).length;
            totalRounds = rounds.length;
        }
        return { totalRounds, roundsWon }
    }
    return null;
}

export async function getGlobalStats(page: number, limit: number) {

    const bestPlayers = await userRepository.createQueryBuilder('users')
        .select('username')
        .addSelect(subQuery => {
            return subQuery
                .select('COUNT(*)')
                .from(Round, 'rounds')
                .where('rounds.user_uuid = users.uuid')
                .andWhere('rounds.winner = true')
        }, 'victories')
        .orderBy('victories', 'DESC')
        .skip(page)
        .take(limit)
        .getRawMany();
    return bestPlayers;
}


export async function getMostAcurrateWords(page: number, limit: number) {

    const acurrateWords = await wordRepository.createQueryBuilder('words')
        .select('word')
        .addSelect(subQuery => {
            return subQuery
                .select('COUNT(*)')
                .from(Round, 'rounds')
                .where('rounds.word_uuid = words.uuid')
                .andWhere('rounds.winner = true')
        }, 'acurrate')
        .orderBy('acurrate', 'DESC')
        .skip(page)
        .take(limit)
        .getRawMany();
    return acurrateWords;
}