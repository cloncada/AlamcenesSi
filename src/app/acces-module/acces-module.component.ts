  import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AreasServiceService } from '../services/areas-service.service';
@Component({
  selector: 'app-acces-module',
  templateUrl: './acces-module.component.html',
  styleUrls: ['./acces-module.component.css']
})

export class AccesModuleComponent implements OnInit {
  profileForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });
  user:any;
  roles:any[];
  cad:any;
  constructor(private router: Router, private service: AreasServiceService) { }

  ngOnInit(): void {

    this.user = localStorage.getItem('User')
    this.user = JSON.parse(this.user);
    this.roles=this.user.role;
    for (let i=0; i<this.roles.length;i++){

      let name= this.roles[i].name;
  this.cad+=name+", " ;
 

    }

    
  }
  posts: any;
  dtTrigger: Subject<any> = new Subject();
  onSubmit() {
    this.service.login(this.profileForm.value.user, this.profileForm.value.password).subscribe(data => {
      this.posts = data;
      this.posts = this.posts;
      this.dtTrigger.next();




      if (this.posts.data != null) {
        if (this.posts.data.role == null) {
          alert("usurio sin roles asignados");


        }

        else if (this.posts.data.role != null) {
          localStorage.setItem('User', JSON.stringify(this.posts.data));
          localStorage.setItem('UserIn',"1");

          this.router.navigate(["tabla"]);


        }



      }
      else {

        alert("Usuario o contraseña incorrectos")

      }



    }, (error) => {
      alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
      // this.alertService.error(JSON.stringify(error));
    });





  }

}