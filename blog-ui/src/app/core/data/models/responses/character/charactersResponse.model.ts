import { Character } from '../../character.model';

export interface CharactersResponse {
    count: number;
    characters: Character[];
}