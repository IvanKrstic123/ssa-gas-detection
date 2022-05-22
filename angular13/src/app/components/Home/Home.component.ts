import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss'],
})
export class HomeComponent implements OnInit {
  public cities$!: Observable<any[]>;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.cities$ = this.sharedService.getCities();
  }

  public onRoute(city: any) {
    this.router.navigate([`/statistic/${city}`]);
  }

  public identity(index: number, el: any): string {
    return el;
  }
}
