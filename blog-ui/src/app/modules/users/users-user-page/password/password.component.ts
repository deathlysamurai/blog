import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/core/data/models/user.model';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Output() currentPageEvent = new EventEmitter<string>();
  user: User = {} as User;
  updatePasswordForm: FormGroup = {} as FormGroup;
  updatedUser: User = {} as User;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private validationService: ValidationService,
              private userService: UserService,
              private router: Router,
              private titleService: Title) { 
                this.titleService.setTitle("Account - Change Password");
              }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.updatePasswordForm = this.fb.group({
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
    this.updatePasswordForm.markAllAsTouched();

    if(this.updatePasswordForm.valid) {
      this.updatedUser.password = this.updatePasswordForm.value.password;

      this.userService.updateUser(this.user._id, this.updatedUser)
        .subscribe((response) => {
          console.log(response);
          this.authService.updateCurrentUser(this.user, this.updatedUser);
          this.currentPageEvent.emit('account');
          //TODO: Add growler message saying user password was updated
        });
    }
  }

}
