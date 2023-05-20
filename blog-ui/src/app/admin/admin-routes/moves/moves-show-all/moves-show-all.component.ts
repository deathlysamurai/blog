import { Component, OnInit } from '@angular/core';
import { MoveService } from 'src/app/core/data/services/move/move.service';
import { Move } from 'src/app/core/data/models/move.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-moves-show-all',
  templateUrl: './moves-show-all.component.html',
  styleUrls: ['./moves-show-all.component.scss']
})
export class MovesShowAllComponent implements OnInit {
  moves!: Move[];
  totalMoves!: number;

  constructor(private moveService: MoveService, private titleService: Title) {
    this.titleService.setTitle("Moves - All");
  }

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

  onClick(id: string) {
    console.log(id);
  }

}
