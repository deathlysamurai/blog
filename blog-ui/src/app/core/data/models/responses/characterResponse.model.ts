import { Character } from '../character.model';

export interface CharacterResponse {
    count: number;
    characters: Character[];
}