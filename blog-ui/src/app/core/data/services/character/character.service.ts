import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharactersResponse } from '../../models/responses/character/charactersResponse.model';
import { CharacterResponse } from '../../models/responses/character/characterResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UpdateModel } from '../../models/updateModel.model';

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

  public getCharacter(characterId: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.baseUrl + this.API_ROUTES.getCharacter(characterId), {'headers': this.loginHeaders()});
  }

  public getCharacters(): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(this.baseUrl + this.API_ROUTES.getCharacters);
  }

  public updateCharacter(characterId: string, updatedCharacter: any, previousImagePath: string) {
    const characterData = new FormData();
    let updateValues: any[] = [] as any[];
    Object.keys(updatedCharacter).forEach(element => {
      if(element == 'imagePath') return;
      let updateValue: UpdateModel = {} as UpdateModel;
      updateValue.propName = element;
      updateValue.value = updatedCharacter[element];
      updateValues.push(updateValue);
    });
    if(updatedCharacter['imagePath']) {
      characterData.append('imagePath', updatedCharacter['imagePath']);
    }
    if(updateValues.length > 0) {
      characterData.append('PROPS', JSON.stringify(updateValues));
    }
    if(previousImagePath) {
      characterData.append('previousImagePath', previousImagePath);
    }
    return this.http.patch(this.baseUrl + this.API_ROUTES.updateCharacter(characterId), characterData, {'headers': this.loginHeaders()});
  }
}
