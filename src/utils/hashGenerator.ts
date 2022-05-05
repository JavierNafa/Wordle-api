import * as bcrypt from 'bcrypt';

export async function hashString(data: string) {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}

export async function compareString(data: string, hash: string) {
    const match = await bcrypt.compare(data, hash);
    return match;
}