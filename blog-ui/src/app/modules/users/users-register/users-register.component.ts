import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/data/models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss']
})
export class UsersRegisterComponent implements OnInit {
  registrationForm: FormGroup = {} as FormGroup;
  user: User = {} as User;

  constructor(private userService: UserService, private validationService: ValidationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [
        '', 
        {
          validators: Validators.required,
          asyncValidators: this.validationService.uniqueUsernameValidator(),
          updateOn: 'blur'
        }
      ],
      email: [
        '', 
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: this.validationService.uniqueEmailValidator(),
          updateOn: 'blur'
        }
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(8),
          this.validationService.patternValidator(/\d/, { hasNumber: true }),
          this.validationService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          this.validationService.patternValidator(/[a-z]/, { hasLowerCase: true }),
          this.validationService.patternValidator(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, { hasSpecialCharacter: true })
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.validationService.passwordMatchValidator },
    );
  }

  onSubmit() {
    if(this.registrationForm.valid) {
      this.user.username = this.registrationForm.value.username;
      this.user.email = this.registrationForm.value.email;
      this.user.password = this.registrationForm.value.password;

      this.userService.registerUser(this.user)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/users/user-page']);
        });
    }
  }

}
