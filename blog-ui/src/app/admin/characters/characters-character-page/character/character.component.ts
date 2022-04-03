import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Character, CharacterClass } from 'src/app/core/data/models/character.model';
import { Move } from 'src/app/core/data/models/move.model';
import { CharacterService } from 'src/app/core/data/services/character/character.service';
import { MoveService } from 'src/app/core/data/services/move/move.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @Input() character: Character = {} as Character;
  @Output() updateCharacterEvent = new EventEmitter();
  updateCharacterForm: FormGroup = {} as FormGroup;
  updatedCharacter: any = {} as any;
  imageData!: string;
  previousImage!: string | null;
  moves!: Move[];
  apiUrl = environment.baseUrl;
  defaultMoves: string[] = [] as string[];

  constructor(private fb: FormBuilder,
              private characterService: CharacterService,
              private moveService: MoveService) { }

  ngOnInit(): void {
    this.moveService.getMoves()
      .subscribe((response) => {
        this.moves = response.moves;
      })

    this.previousImage = this.character.imagePath?.toString();
    this.setDefaultMoves();

    this.updateCharacterForm = this.fb.group({
      name: new FormControl(this.character.name, Validators.required),
      description: new FormControl(this.character.description, Validators.required),
      imagePath: new FormControl(this.character.imagePath?.toString(), Validators.required),
      moves: new FormControl(this.defaultMoves, Validators.required),
      health: new FormControl(this.character.health, Validators.required),
      speed: new FormControl(this.character.speed, Validators.required)
    });
  }

  setDefaultMoves() {
    for(let move in this.character.moves) {
      this.defaultMoves.push(this.character.moves[move]._id);
    }
  }

  onFileSelect(event: Event) {
    this.updateCharacterForm.controls['imagePath'].markAsTouched();
    const file = (event.target as HTMLInputElement).files![0];
    if(file) {
      this.updateCharacterForm.patchValue({ imagePath: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
          this.previousImage = null;
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.previousImage = this.character.imagePath?.toString();
      this.imageData = "";
      this.updateCharacterForm.patchValue({ imagePath: this.character.imagePath?.toString() });
    }
  }

  onSubmit() {
    this.updateCharacterForm.markAllAsTouched();

    if(this.updateCharacterForm.valid) {      
      CharacterClass.PROP_NAMES.forEach(element => {
        for(let control in this.updateCharacterForm.controls) {
          if(control == element) {
            let character: any = this.character;
            if(element == 'moves') {
              character[element] = this.defaultMoves;
            }
            if(character[element] != this.updateCharacterForm.value[control]) {
              this.updatedCharacter[element] = this.updateCharacterForm.value[control];
            }
          }
        }
      });

      if(Object.entries(this.updatedCharacter).length > 0) {
        this.characterService.updateCharacter(this.character._id, this.updatedCharacter, this.character.imagePath?.toString())
          .subscribe((response) => {
            this.updateCharacterEvent.emit();
            //TODO: Add growler message saying user was updated
            this.updatedCharacter = {};
          });
      } else {
        this.updateCharacterForm.setErrors({noNewValues: true});
      }
    }
  }

}
