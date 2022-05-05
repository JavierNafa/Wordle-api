import * as jwt from 'jsonwebtoken';
const { TOKEN_EXPIRATION_TIME: expiration = '1h' } = process.env;

export async function generateToken(userUuid: string, secretKey: string, exp: string = expiration) {
    return new Promise((resolve, reject) => {
        jwt.sign({ userUuid }, secretKey, { algorithm: 'HS256', expiresIn: exp }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

export async function decodeToken(token: string, secretKey: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}