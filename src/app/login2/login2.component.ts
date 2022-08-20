import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgModel,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit {
  data = {
    email: 'u8873590@gmail.com',
    password: 'test',
    isRemember: true,
    profiles: [
      {
        city: 'S',
        tel: '0922222',
      },
      {
        city: 'S2',
        tel: '0922222',
      },
      {
        city: 'S3',
        tel: '0922222',
      },
    ],
  };

  form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
      nonNullable: true,
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(120),
        this.forbiddenPassword,
      ],
    }),
    isRemember: this.fb.control(true, {}),
    profiles: this.fb.array([
      this.makeProfile('Taipei', '09000000'),
      this.makeProfile('Taichung', '09111111'),
    ]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  forbiddenPassword(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }
    let words = ['123', '456'];
    const result = words.some((word) => {
      return control.value.indexOf(word) !== -1;
    });
    // const result = words.find((word) => {
    //   if (control.value.indexOf(word) !== -1) {
    //     return true;
    //   }
    //   return false;
    // });
    if (result) {
      return { forbiddenPassword: true };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      this.checkValidity(this.form);
      this.form.controls.profiles.clear();
      this.data.profiles.forEach((profile) => {
        this.form.controls.profiles.push(
          this.makeProfile(profile.city, profile.tel)
        );
      });
      this.form.setValue(this.data, { emitEvent: false });
    }, 2000);
  }

  checkValidity(g: FormGroup) {
    Object.keys(g.controls).forEach((key) => {
      g.get(key)?.markAsDirty();
      g.get(key)?.markAsTouched();
      g.get(key)?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  doLogin(form: FormGroupDirective) {
    if (form.valid) {
      localStorage.setItem('apikey', 'TEST');
      var url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
    }
  }

  isInvalid(control: FormControl, form: FormGroupDirective) {
    return control.invalid && (control.touched || form.submitted);
  }
  fc(name: string) {
    return this.form.get(name) as FormControl;
  }
  fg(name: string) {
    return this.form.get(name) as FormGroup;
  }
  fa(name: string) {
    return this.form.get(name) as FormArray;
  }
  isValid(control: FormControl) {
    return control.valid && control.touched;
  }
  onReset() {
    this.form.reset(this.data);
  }
  // disableField(control: NgModel) {
  //   control.control.disable();
  // }
  addProfile() {
    this.form.controls.profiles.push(this.makeProfile('', ''));
  }

  makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, { validators: [Validators.required] }),
      tel: this.fb.control(tel, { validators: [Validators.required] }),
    });
  }
}
