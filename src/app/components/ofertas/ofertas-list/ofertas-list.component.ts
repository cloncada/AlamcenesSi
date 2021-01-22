import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ofertas-list',
  templateUrl: './ofertas-list.component.html',
  styleUrls: ['./ofertas-list.component.css']
})
export class OfertasListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  title = 'datatables';
  dtOptions: any = {};
  posts: any = [];
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      responsive: true,
      processing: false
    };
  
    this.http.get(environment.apiUrl+'oferta')
      .subscribe(posts => {
        this.posts = posts["data"];
        this.dtTrigger.next();
    });

  }

}
