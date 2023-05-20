import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moves-index',
  templateUrl: './moves-index.component.html',
  styleUrls: ['./moves-index.component.scss']
})
export class MovesIndexComponent implements OnInit {
  currentPage: string = 'move';

  constructor() { }

  ngOnInit(): void { }

  newPage(page: string) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`.${page}`)?.classList.add("active");
    this.currentPage = page;
  }

}
