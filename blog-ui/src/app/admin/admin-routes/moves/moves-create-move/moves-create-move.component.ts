import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Move } from 'src/app/core/data/models/move.model';
import { MoveService } from 'src/app/core/data/services/move/move.service';

@Component({
  selector: 'app-moves-create-move',
  templateUrl: './moves-create-move.component.html',
  styleUrls: ['./moves-create-move.component.scss']
})
export class MovesCreateMoveComponent implements OnInit {
  createMoveForm!: FormGroup;
  move: Move = {} as Move;

  constructor(private moveService: MoveService, private titleService: Title) { 
    this.titleService.setTitle("Moves - Create");
  }

  ngOnInit(): void {
    this.createMoveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      ability: new FormControl(null, Validators.required),
      power: new FormControl(null, Validators.required),
      uses: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.createMoveForm.markAllAsTouched();

    if(this.createMoveForm.valid) {
      this.move.name = this.createMoveForm.value.name;
      this.move.ability = this.createMoveForm.value.ability;
      this.move.power = this.createMoveForm.value.power;
      this.move.uses = this.createMoveForm.value.uses;
      
      this.moveService.addMove(this.move)
        .subscribe((response) => {
          console.log(response);
          // TODO: Create growler message that informs of character created
        })
    }
  }

}
