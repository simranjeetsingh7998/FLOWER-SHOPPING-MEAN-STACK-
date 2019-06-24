import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})

export class LoginCompComponent implements OnInit {
    model: any = {};
    returnUrl: string;

    constructor(public router:Router) { }

    ngOnInit() {
    }

    login(form) {
        console.log(form.username.value);
        if(form.username.value=="admin"&&form.password.value=="admin")
            this.router.navigate(['admin']);
        else if(form.username.value=="cust"&&form.password.value=="cust")
            this.router.navigate(['cust']);
        else
           alert('Invalid Login'); 
    }

}
