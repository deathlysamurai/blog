import { Character } from './character.model';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    level: number;
    xp: number;
    characters?: Character[];
    admin: boolean;
}
