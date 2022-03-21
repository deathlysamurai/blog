import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse } from '../../models/responses/characterResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly API_ROUTES = {
    addCharacter: '/characters',
    deleteCharacter: (characterId: string) => `/characters/${characterId}`,
    getCharacter: (characterId: string) => `/characters/${characterId}`,
    getCharacters: '/characters',
    updateCharacter: (characterId: string) => `/characters/${characterId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // public addCharacter(character: Character) {
  //   return this.http.post(this.baseUrl + this.API_ROUTES.addCharacter, character);
  // }

  // public deleteCharacter(character: Character) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deleteCharacter(character.id));
  // }

  // public getCharacter(character: Character) {
  //   return this.http.get(this.baseUrl + this.API_ROUTES.getCharacter(character.id));
  // }

  public getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.baseUrl + this.API_ROUTES.getCharacters);
  }

  // public updateCharacter(character: Character) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updateCharacter(character.id), character);
  // }
}
