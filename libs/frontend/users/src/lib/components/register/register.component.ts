import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isNullOrUndefined } from "@nx-fullstack-realworld/shared";

@Component({
  selector: 'nx-fullstack-realworld-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectionService: ChangeDetectorRef
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

  handleSubmit() {
    console.log(this.registerForm);
  }
}
