import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { User } from 'src/app/core/data/models/user.model';

@Component({
  selector: 'app-users-show-all',
  templateUrl: './users-show-all.component.html',
  styleUrls: ['./users-show-all.component.scss']
})
export class UsersShowAllComponent implements OnInit {
  users!: User[];
  totalUsers!: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe((response) => {
      console.log(response);
      this.totalUsers = response.count;
      this.users = response.users;
    })
  }

}
