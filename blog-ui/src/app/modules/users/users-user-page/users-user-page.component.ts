import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/data/models/user.model';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-users-user-page',
  templateUrl: './users-user-page.component.html',
  styleUrls: ['./users-user-page.component.scss']
})
export class UsersUserPageComponent implements OnInit {
  updateUserForm: FormGroup = {} as FormGroup;
  user: User = {} as User;
  updatedUser: User = {} as User;

  constructor(private userService: UserService, 
              private validationService: ValidationService, 
              private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.updateUserForm = this.fb.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      username: [
        this.user.username, 
        {
          validators: Validators.required,
          asyncValidators: this.validationService.uniqueUsernameValidator(),
          updateOn: 'blur'
        }
      ],
      email: [
        this.user.email, 
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: this.validationService.uniqueEmailValidator(),
          updateOn: 'blur'
        }
      ],
      // password: [
      //   '', 
      //   [
      //     Validators.required,
      //     Validators.minLength(8),
      //     this.validationService.patternValidator(/\d/, { hasNumber: true }),
      //     this.validationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      //     this.validationService.patternValidator(/[a-z]/, { hasLowerCase: true }),
      //     this.validationService.patternValidator(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, { hasSpecialCharacter: true })
      //   ],
      // ],
      // confirmPassword: ['', Validators.required],
    },
      // { validator: this.validationService.passwordMatchValidator },
    );
  }

  onSubmit() {
    this.updateUserForm.markAllAsTouched();

    if(this.updateUserForm.valid) {
      if(this.updateUserForm.value.username != this.user.username) {
        this.updatedUser.username = this.updateUserForm.value.username;
      }
      if(this.updateUserForm.value.email != this.user.email) {
        this.updatedUser.email = this.updateUserForm.value.email;
      }
      this.updatedUser.firstName = this.updateUserForm.value.firstName;
      this.updatedUser.lastName = this.updateUserForm.value.lastName;

      this.userService.updateUser(this.user._id, this.updatedUser)
        .subscribe((response) => {
          console.log(response);
          this.authService.updateCurrentUser(this.user, this.updatedUser);
          //TODO: Add growler message saying user was updated
        });
    }
  }

}
