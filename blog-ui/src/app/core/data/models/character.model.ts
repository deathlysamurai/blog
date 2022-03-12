import { Move } from './move.model';

export interface Character {
    id: string;
    name: string;
    // description: string;
    // image: string;
    moves: Move[];
    health: number;
    // speed: number;
}
