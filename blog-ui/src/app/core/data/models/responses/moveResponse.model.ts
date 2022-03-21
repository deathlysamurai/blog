import { Move } from '../move.model';

export interface MoveResponse {
    count: number;
    moves: Move[];
}