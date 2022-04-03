import { Character } from '../../character.model';

export interface CharacterResponse {
    character: Character;
    request: string[];
}