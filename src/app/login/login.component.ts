import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';


  constructor(private auth: AuthService, private router: Router ) {}

  ngOnInit(): void {}

  onLogin(){
    this.auth.login(this.username, this.password).subscribe({
      next: ()=> this.router.navigate(['/']),
      error:()=> {
        this.error = "Invalid Username or Password"
      setTimeout(() => {
        this.error = ""
      }, 5000);
    },
      complete: () => console.log('Login attempt completed')
    })
  }

}
