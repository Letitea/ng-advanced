import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  data = {
    email: '',
    password: '',
    isRemember: true,
  };
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    document.body.className = '';
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }
  doLogin(form: NgForm) {
    if (form.valid) {
      localStorage.setItem('apikey', 'TEST');
      var url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
    }
  }

  isInvalid(control: NgModel, form: NgForm) {
    return control.invalid && (control.touched || form.submitted);
  }

  isValid(control: NgModel) {
    return control.valid && control.touched;
  }

  disableField(control: NgModel) {
    control.control.disable();
  }
}
