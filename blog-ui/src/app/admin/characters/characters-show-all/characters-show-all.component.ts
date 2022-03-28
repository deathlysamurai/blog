import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/data/services/character/character.service';
import { Character } from 'src/app/core/data/models/character.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-characters-show-all',
  templateUrl: './characters-show-all.component.html',
  styleUrls: ['./characters-show-all.component.scss']
})
export class CharactersShowAllComponent implements OnInit {
  characters!: Character[];
  totalCharacters!: number;
  apiUrl = environment.baseUrl;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharacters()
      .subscribe((response) => {
        console.log(response);
        this.totalCharacters = response.count;
        this.characters = response.characters;
      })
  }

  onClick(id: string) {
    console.log(id);
  }

}