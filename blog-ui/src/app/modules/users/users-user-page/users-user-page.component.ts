import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/data/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users-user-page',
  templateUrl: './users-user-page.component.html',
  styleUrls: ['./users-user-page.component.scss']
})
export class UsersUserPageComponent implements OnInit {
  user: User = {} as User;
  currentPage: string = 'account';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  newPage(page: string) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`.${page}`)?.classList.add("active");
    this.currentPage = page;
  }

}
