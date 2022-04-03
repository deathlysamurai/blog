import { Move } from './move.model';

export interface Character {
    _id: string;
    name: string;
    description: string;
    imagePath: File;
    moves: Move[];
    health: number;
    speed: number;
}

export class CharacterClass {
    _id: string;
    name: string;
    description: string;
    imagePath: File;
    moves: Move[];
    health: number;
    speed: number;

    constructor(_id:string, name:string, description:string, imagePath:File, moves: Move[], health: number, speed:number) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.moves = moves;
        this.health = health;
        this.speed = speed;
    }

    static PROP_NAMES = ['_id', 'name', 'description', 'imagePath', 'moves', 'health', 'speed'];
}
