import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../models/character.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly API_ROUTES = {
    addCharacter: '/character',
    deleteCharacter: (characterId: string) => `/character/${characterId}`,
    getCharacter: (characterId: string) => `/character/${characterId}`,
    getCharacters: '/character',
    updateCharacter: (characterId: string) => `/character/${characterId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public addCharacter(character: Character) {
    return this.http.post(this.baseUrl + this.API_ROUTES.addCharacter, character);
  }

  public deleteCharacter(character: Character) {
    return this.http.delete(this.baseUrl + this.API_ROUTES.deleteCharacter(character.id));
  }

  public getCharacter(character: Character) {
    return this.http.get(this.baseUrl + this.API_ROUTES.getCharacter(character.id));
  }

  public getCharacters() {
    return this.http.get(this.baseUrl + this.API_ROUTES.getCharacters);
  }

  public updateCharacter(character: Character) {
    return this.http.put(this.baseUrl + this.API_ROUTES.updateCharacter(character.id), character);
  }
}
