import { Move } from './move.model';

export interface Character {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    moves: Move[];
    health: number;
    speed: number;
}
