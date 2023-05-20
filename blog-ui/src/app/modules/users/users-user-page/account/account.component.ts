import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User, UserClass } from 'src/app/core/data/models/user.model';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User = {} as User;
  updateUserForm: FormGroup = {} as FormGroup;
  updatedUser: any = {} as any;

  constructor(private fb: FormBuilder,
              private validationService: ValidationService,
              private userService: UserService,
              private authService: AuthService, 
              private titleService: Title) { 
                this.titleService.setTitle("Account - Info");
              }

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
    },
    );
  }

  onSubmit() {
    this.updateUserForm.markAllAsTouched();

    if(this.updateUserForm.valid) {      
      UserClass.PROP_NAMES.forEach(element => {
        for(let control in this.updateUserForm.controls) {
          if(control == element) {
            let user: any = this.user;
            if(user[element] != this.updateUserForm.value[control]) {
              this.updatedUser[element] = this.updateUserForm.value[control];
            }
          }
        }
      });
      
      if(Object.entries(this.updatedUser).length > 0) {
        this.userService.updateUser(this.user._id, this.updatedUser)
          .subscribe((response) => {
            console.log(response);
            this.authService.updateCurrentUser(this.user, this.updatedUser);
            //TODO: Add growler message saying user was updated
            this.updatedUser = {};
          });
      } else {
        this.updateUserForm.setErrors({noNewValues: true});
      }
    }
  }

}
