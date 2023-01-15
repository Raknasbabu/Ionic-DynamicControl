import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dynamicControlModel, DynamicFormControl, Page } from 'src/app/Model/dynamicControlModel';

@Component({
  selector: 'app-dynamic-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class dynamicFormComponent implements OnChanges {
  @Input() pageFormData: Page | undefined;
  public myForm: FormGroup = this.fb.group({});
  public pageId: string = "";
  constructor(private fb: FormBuilder, private route: Router) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['pageFormData'].firstChange) {

      if (this.pageFormData)
        this.createForm(this.pageFormData?.controls);
    }
  }

  createForm(controls: DynamicFormControl[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      if (control.validation) {
        for (const [key, value] of Object.entries(control.validation)) {
          switch (key) {
            // case 'min':
            //   validatorsToAdd.push(Validators.min(value));
            //   break;
            // case 'max':
            //   validatorsToAdd.push(Validators.max(value));
            //   break;
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'requiredTrue':
              if (value) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (value) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            // case 'minLength':
            //   validatorsToAdd.push(Validators.minLength(value));
            //   break;
            // case 'maxLength':
            //   validatorsToAdd.push(Validators.maxLength(value));
            //   break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(value));
              break;
            case 'nullValidator':
              if (value) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }
      }

      if (control.type != 'label' && control.type != 'button') {
        this.myForm.addControl(
          control.id,
          this.fb.control(control.value, validatorsToAdd)
        );
      }
    }
  }

  onSubmit(controlData: any) {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    this.route.navigate(['/folder/' + controlData.navigate]);

  }
}
