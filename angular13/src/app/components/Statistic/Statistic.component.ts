import { City } from './../../models/city.model';
import {  Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-Statistic',
  templateUrl: './Statistic.component.html',
  styleUrls: ['./Statistic.component.scss'],
})
export class StatisticComponent implements OnInit, OnDestroy {
  public cities!: any[];
  public city!: string;

  public colors: any[] = [
    'alert-primary',
    'alert-secondary',
    'alert-success',
    'alert-danger',
    'alert-warning',
    'alert-info',
    'alert-dark',
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels!: string[];
  public barChartData: any[] = [
    { data: [], label: 'Ugljen-monoksid' },
    { data: [], label: 'Ugljen-dioksid' },
    { data: [], label: 'Metan' },
    { data: [], label: 'Propan' },
    { data: [], label: 'Butan' },
  ];

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCities();
    this.route.params.pipe(untilDestroyed(this)).subscribe((value) => {
      console.log(value['id']);
      this.barChartData = [
        { data: [], label: 'Ugljen-monoksid' },
        { data: [], label: 'Ugljen-dioksid' },
        { data: [], label: 'Metan' },
        { data: [], label: 'Propan' },
        { data: [], label: 'Butan' },
      ];
      this.barChartLabels = [];
      this.getCityInformation(value['id']);
    });
  }

  private getCityInformation(city: string) {
    this.sharedService
      .getCityInformation(city)
      .pipe(untilDestroyed(this))
      .subscribe((data: City) => {
        console.log(data);
        if (!data) {
          this.router.navigate(['no-content']);
          return;
        } else {
          this.barChartLabels = data.months.map((item: any) => item.name);
          this.city = data.city;
          this.barChartLabels.forEach((element, index) => {
            this.barChartData[0].data.push(data.months[index]['co']);
            this.barChartData[1].data.push(data.months[index]['co2']);
            this.barChartData[2].data.push(data.months[index]['methane']);
            this.barChartData[3].data.push(data.months[index]['propane']);
            this.barChartData[4].data.push(data.months[index]['butane']);
          });
          console.log(this.barChartData);
        }
      });
  }

  private getCities() {
    this.sharedService
      .getCities()
      .pipe(untilDestroyed(this))
      .subscribe((city: any[]) => {
        let len = city.length - this.colors.length;
        if (len > 0) {
          while (len > 0) {
            this.colors.push(
              this.colors[Math.floor(Math.random() * this.colors.length)]
            );
            len--;
            console.log(this.colors);
            console.log(len);
          }
        }

        this.cities = city.map((item, index) => {
          return {
            city: city[index],
            btClass: this.colors[index],
          };
        });
        console.log(this.cities);
      });
  }

  public onRoute(item: any) {
    this.router.navigate([`/statistic/${item.city}`]);
  }

  ngOnDestroy(): void {}
}
