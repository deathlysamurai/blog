import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Character } from 'src/app/core/data/models/character.model';
import { Move } from 'src/app/core/data/models/move.model';
import { CharacterService } from 'src/app/core/data/services/character/character.service';
import { MoveService } from 'src/app/core/data/services/move/move.service';

@Component({
  selector: 'app-characters-create-character',
  templateUrl: './characters-create-character.component.html',
  styleUrls: ['./characters-create-character.component.scss']
})
export class CharactersCreateCharacterComponent implements OnInit {
  createCharacterForm!: FormGroup;
  imageData!: string;
  moves!: Move[];
  character: Character = {} as Character;

  constructor(private moveService: MoveService, private characterService: CharacterService, private titleService: Title) { 
    this.titleService.setTitle("Character - Create");
  }

  ngOnInit(): void {
    this.moveService.getMoves()
      .subscribe((response) => {
        this.moves = response.moves;
      })

    this.createCharacterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      moves: new FormControl(null, Validators.required),
      health: new FormControl(null, Validators.required),
      speed: new FormControl(null, Validators.required)
    });
  }

  onFileSelect(event: Event) {
    this.createCharacterForm.controls['image'].markAsTouched();
    const file = (event.target as HTMLInputElement).files![0];
    if(file) {
      this.createCharacterForm.patchValue({ image: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.imageData = "";
      this.createCharacterForm.patchValue({ image: '' });
    }
  }

  onSubmit() {
    this.createCharacterForm.markAllAsTouched();

    if(this.createCharacterForm.valid) {
      this.character.name = this.createCharacterForm.value.name;
      this.character.description = this.createCharacterForm.value.description;
      this.character.imagePath = this.createCharacterForm.value.image;
      this.character.moves = this.createCharacterForm.value.moves;
      this.character.health = this.createCharacterForm.value.health;
      this.character.speed = this.createCharacterForm.value.speed;
      
      this.characterService.addCharacter(this.character)
        .subscribe((response) => {
          console.log(response);
          // TODO: Create growler message that informs of character created
        })
    }
  }

}
