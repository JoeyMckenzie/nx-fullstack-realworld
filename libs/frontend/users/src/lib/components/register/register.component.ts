import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { isNullOrUndefined, Maybe } from '@nx-fullstack-realworld/shared';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UsersFacade } from '../../+state';

@Component({
  selector: 'nx-fullstack-realworld-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  currentRegistrationErrors$ = this.usersFacade.currentErrors$;
  isNullOrUndefined = isNullOrUndefined;
  registerForm!: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.currentRegistrationErrors$.pipe(
      takeUntil(this.unsubscribe$),
      tap(() => console.log('selector updated'))
    );

    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFormSubmit() {
    const email: string = this.registerForm.get('email')?.value;
    const username: string = this.registerForm.get('username')?.value;
    const password: string = this.registerForm.get('password')?.value;

    this.usersFacade.register({ email, username, password });
  }

  getFormControlErrors(controlKey: string, errorType: string): Maybe<string> {
    const control = this.registerForm.get(controlKey);

    if (control?.pristine) {
      return '';
    }

    return control?.getError(errorType);
  }
}
