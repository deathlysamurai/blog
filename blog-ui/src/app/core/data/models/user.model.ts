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

export class UserClass {
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

    constructor(_id:string, firstName:string, lastName:string, username:string, email:string, password:string, level:number, xp:number, characters: Character[], admin: boolean) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.level = level;
        this.xp = xp;
        this.characters = characters;
        this.admin = admin;
    }

    static PROP_NAMES = ['_id', 'firstName', 'lastName', 'username', 'email', 'password', 'level', 'xp', 'characters', 'admin'];
}
