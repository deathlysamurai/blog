import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/data/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.scss']
})
export class UsersLoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: User = {} as User;
  invalidLogin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private titleService: Title) { 
    this.titleService.setTitle("Sign In");
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid) {
      this.user.username = this.loginForm.value.username;
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;

      this.userService.loginUser(this.user)
        .subscribe((response) => {
          let redirectUrl = '/users/user-page';
          this.authService.login(response.body!.token, response.body!.user, response.body!.user.admin);
          if(this.authService.redirectUrl) {
            redirectUrl = this.authService.redirectUrl;
          }
          this.router.navigate([redirectUrl]);
        }, (error) => {
          this.invalidLogin = true;
        });
    }
  }

}
