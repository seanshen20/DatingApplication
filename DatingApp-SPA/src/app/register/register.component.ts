import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AltertifyService } from '../_services/altertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private altertify: AltertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.altertify.success('registration successful');
    }, error => {
      this.altertify.error(error);
    });
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
