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
import { takeUntil } from 'rxjs/operators';
import { UsersFacade } from '../../+state';

@Component({
  selector: 'nx-fullstack-realworld-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  currentRegistrationError$ = this.usersFacade.currentError$;
  registerForm!: FormGroup;
  isNullOrUndefined = isNullOrUndefined;

  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade
  ) {}

  get isValid(): boolean {
    let childControlsAreValid = true;

    for (const controlKey in this.registerForm.controls) {
      if (!childControlsAreValid) {
        break;
      }

      const control = this.registerForm.get(controlKey);

      if (isNullOrUndefined(control)) {
        continue;
      }

      if (!control!.valid) {
        childControlsAreValid = false;
      }
    }

    return this.registerForm.valid && childControlsAreValid;
  }

  ngOnInit(): void {
    this.currentRegistrationError$.pipe(takeUntil(this.unsubscribe$));

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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

  getFormControlErrors(control: string, errorType: string): Maybe<string> {
    return this.registerForm.get(control)?.getError(errorType);
  }
}
