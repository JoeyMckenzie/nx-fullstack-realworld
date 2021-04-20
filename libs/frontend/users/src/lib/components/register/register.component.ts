import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from '@nx-fullstack-realworld/shared';
import { UsersFacade } from '../../+state';

@Component({
  selector: 'nx-fullstack-realworld-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get isValid(): boolean {
    return this.registerForm.valid;
  }

  get formErrors(): string[] {
    let errors = [];

    for (let controlKey in this.registerForm.controls) {
      const control = this.registerForm.get(controlKey);

      if (isNullOrUndefined(control) || isNullOrUndefined(control!.errors)) {
        continue;
      }
    }

    return [''];
  }

  onFormSubmit() {
    const email: string = this.registerForm.get('email')?.value;
    const username: string = this.registerForm.get('username')?.value;
    const password: string = this.registerForm.get('password')?.value;

    this.usersFacade.register({ email, username, password });
  }
}
