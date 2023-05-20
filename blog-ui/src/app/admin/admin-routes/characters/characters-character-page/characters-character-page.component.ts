import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/core/data/models/character.model';
import { CharacterService } from 'src/app/core/data/services/character/character.service';

@Component({
  selector: 'app-characters-character-page',
  templateUrl: './characters-character-page.component.html',
  styleUrls: ['./characters-character-page.component.scss']
})
export class CharactersCharacterPageComponent implements OnInit {
  character: Character | null = null;
  currentPage: string = 'character';

  constructor(private route: ActivatedRoute, private characterService: CharacterService, private titleService: Title) { 
    this.titleService.setTitle("Character");
  }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    this.character = null;
    this.characterService.getCharacter(this.route.snapshot.params.id)
    .subscribe((response) => {
      this.character = response.character;
      this.titleService.setTitle("Character - " + this.character?.name);
    })
  }

  newPage(page: string) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`.${page}`)?.classList.add("active");
    this.currentPage = page;
  }

}
