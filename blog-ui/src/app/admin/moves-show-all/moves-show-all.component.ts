import { Component, OnInit } from '@angular/core';
import { MoveService } from 'src/app/core/data/services/move/move.service';
import { Move } from 'src/app/core/data/models/move.model';

@Component({
  selector: 'app-moves-show-all',
  templateUrl: './moves-show-all.component.html',
  styleUrls: ['./moves-show-all.component.scss']
})
export class MovesShowAllComponent implements OnInit {
  moves!: Move[];
  totalMoves!: number;

  constructor(private moveService: MoveService) { }

  ngOnInit(): void {
    this.getMoves();
  }

  getMoves() {
    this.moveService.getMoves()
    .subscribe((response) => {
      console.log(response);
      this.totalMoves = response.count;
      this.moves = response.moves;
    })
  }

}
