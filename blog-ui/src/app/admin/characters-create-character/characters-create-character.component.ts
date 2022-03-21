import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-characters-create-character',
  templateUrl: './characters-create-character.component.html',
  styleUrls: ['./characters-create-character.component.scss']
})
export class CharactersCreateCharacterComponent implements OnInit {
  createCharacterForm!: FormGroup;
  imageData!: string;

  constructor() { }

  ngOnInit(): void {
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
    }
  }

  onSubmit() {
    console.log(this.createCharacterForm.controls['image']);
    if(this.createCharacterForm.valid) {
      console.log(this.imageData);
    }
  }

}
