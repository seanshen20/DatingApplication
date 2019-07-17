import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from '../_model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user: User = {};
  registerForm: FormGroup;
  // not working
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private altertify: AlertifyService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.altertify.success('registration successful');
      }, error => this.altertify.error(error)
      , () => this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      }));
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.altertify.success('registration successful');
    // }, error => {
    //   this.altertify.error(error);
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    // console.log(this.valuesFromHome);
    // practice dynamically adding option
    // if (this.valuesFromHome.filter(e => e.name === 'value 104').length === 0) {
    //   this.valuesFromHome = [
    //     ...this.valuesFromHome,
    //     { id: 4, name: 'value 104' }
    //   ];
    // }
    this.cancelRegister.emit(false);
  }

}
