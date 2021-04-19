import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'nx-fullstack-realworld-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorComponent implements OnInit {

  @Input("formGroup")
  formGroup?: FormGroup;

  constructor(private changeDetectorService: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
