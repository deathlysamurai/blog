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
