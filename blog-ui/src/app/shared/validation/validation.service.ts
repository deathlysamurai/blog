import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/core/data/services/user/user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private userService: UserService, private authService: AuthService) { }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
  
      const valid = regex.test(control.value);
  
      return valid ? null : error;
    };
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')!.setErrors({ noPasswordMatch: true });
    }
  }

  uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if(!control.value) {
        return of(null);
      }
      if(this.authService.getCurrentUser()) {
        if(this.authService.getCurrentUser().username == control.value) {
          return of(null);
        }
      }

      return this.userService.verifyUniqueUser(control?.value).pipe(map(
        (response) => {
          return response.status == 200 ? { hasUniqueUsername: true } : null;
        }
      ));
    }
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if(!control.value) {
        return of(null);
      }
      if(this.authService.getCurrentUser()) {
        if(this.authService.getCurrentUser().email == control.value) {
          return of(null);
        }
      }

      return this.userService.verifyUniqueUser(control?.value).pipe(map(
        (response) => {
          return response.status == 200 ? { hasUniqueEmail: true } : null;
        }
      ));
    }
  }
}
