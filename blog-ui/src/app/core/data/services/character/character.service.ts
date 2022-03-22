import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharacterResponse } from '../../models/responses/characterResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginHeaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getCurrentUserToken());
  }

  public addCharacter(character: Character) {
    const characterData = new FormData();
    characterData.append('name', character.name);
    characterData.append('description', character.description);
    characterData.append('imagePath', character.imagePath);
    characterData.append('moves', character.moves.toString());
    characterData.append('health', character.health.toString());
    characterData.append('speed', character.speed.toString());
    return this.http.post(this.baseUrl + this.API_ROUTES.addCharacter, characterData, {'headers': this.loginHeaders()});
  }

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
