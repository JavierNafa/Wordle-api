import * as jwt from 'jsonwebtoken';
const { TOKEN_KEY: key, TOKEN_EXPIRATION_TIME: expiration = '1h' } = process.env;

export async function generateToken(userUuid: string) {
    return new Promise((resolve, reject) => {
        jwt.sign({ userUuid }, key, { algorithm: 'HS256', expiresIn: expiration }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

export async function decodeToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}