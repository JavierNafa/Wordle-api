import { dataSource } from '../database/connection';
import { compareString } from '../utils/hashGenerator';
import { generateToken, decodeToken } from '../utils/tokenGenerator';
import { User } from '../entities/user';

const { TOKEN_KEY: secretKey, REFRESH_TOKEN_KEY: refreshTokenKey } = process.env;
const userRepository = dataSource.getRepository(User);

export async function generateTokens(userUuid: string) {
    const accessToken = await generateToken(userUuid, secretKey);
    const refreshToken = await generateToken(userUuid, refreshTokenKey, '2h');
    return { accessToken, refreshToken };
}

export async function verifyHash(username: string, password: string) {

    const user: User = await userRepository.findOneBy({ username });
    let isValid = false;
    if (user) {
        isValid = await compareString(password, user.password);
    }
    return { isValid, user };
}

export async function verifyToken(token: string, isRefreshToken: boolean) {
    const payload: any = await decodeToken(token, isRefreshToken ? refreshTokenKey : secretKey);
    const user: User = await userRepository.findOneBy({ uuid: payload.userUuid });
    if (user) {
        return user.uuid;
    }
    return null;
}