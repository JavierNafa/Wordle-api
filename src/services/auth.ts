import { dataSource } from '../database/connection';
import { compareString } from '../utils/hashGenerator';
import { User } from '../entities/user';
import { IUser } from '../models/user';

const userRepository = dataSource.getRepository(User);

export async function verifyHash(username: string, password: string) {

    const exist: User = await userRepository.findOneByOrFail({ username });
}