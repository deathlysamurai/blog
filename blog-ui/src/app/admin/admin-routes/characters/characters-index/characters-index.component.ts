import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters-index',
  templateUrl: './characters-index.component.html',
  styleUrls: ['./characters-index.component.scss']
})
export class CharactersIndexComponent implements OnInit {
  currentPage: string = 'character';

  constructor() { }

  ngOnInit(): void { }

  newPage(page: string) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`.${page}`)?.classList.add("active");
    this.currentPage = page;
  }

}
