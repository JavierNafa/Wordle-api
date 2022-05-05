import { dataSource } from '../database/connection';
import { hashString } from '../utils/hashGenerator';
import { User } from '../entities/user';
import { IUser } from '../models/user';

const userRepository = dataSource.getRepository(User);

export async function register(user: IUser) {

    const exist: User = await userRepository.findOne({ where: { username: user.username } });
    if (exist) return null;

    const hash = await hashString(user.password);
    user.password = hash;
    return await userRepository.save(user);
}