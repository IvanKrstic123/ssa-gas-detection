import { City, Month } from './../../models/city.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-Statistic',
  templateUrl: './Statistic.component.html',
  styleUrls: ['./Statistic.component.scss'],
})
export class StatisticComponent implements OnInit, OnDestroy {
  public cities: { city: string; btClass: string }[] = [];
  public originalCities: { city: string; btClass: string }[] = [];
  public mappedCities: any[] = [];
  public city!: string;

  public zagadjenost: string = 'Zagadjenost';

  public sortData: any[] = [
    {
      id: 1,
      name: 'Najmanja zagadjenost',
    },
    {
      id: 2,
      name: 'Najveca zagadjenost',
    },
  ];

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

  public searchInputControl: FormControl = new FormControl();

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
    this.getAllCities();
    this.search();
    this.listenRouting();
  }

  private getCityInformation(city: string) {
    this.sharedService
      .getCityInformation(city)
      .pipe(untilDestroyed(this))
      .subscribe((data: City) => {
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
        }
      });
  }

  private listenRouting() {
    this.route.params.pipe(untilDestroyed(this)).subscribe((value) => {
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
          }
        }

        this.cities = city.map((item, index) => {
          return {
            city: city[index],
            btClass: this.colors[index],
          };
        });
        this.originalCities = this.cities;
      });
  }

  public getAllCities() {
    this.sharedService
      .getAllCities()
      .pipe(untilDestroyed(this))
      .subscribe((cities: City[]) => {
        this.mappedCities = cities.map((item: City) => {
          return {
            ...item,
            sumCo2: item.months.reduce((accumulator, object) => {
              return accumulator + object.co2;
            }, 0),
          };
        });
      });
  }

  public onSelectedSort(sort: { id: number; name: string }) {
    switch (sort.name.toLowerCase()) {
      case 'najmanja zagadjenost': {
        this.cities = this.mappedCities
          .sort((a, b) => a.sumCo2 - b.sumCo2)
          .map((item, index) => {
            return {
              city: item.city,
              btClass:
                this.colors[Math.floor(Math.random() * this.colors.length)],
            };
          });
        this.zagadjenost = 'Najmanja Zagadjenost';
        this.sortData = this.sortData.filter((item) => item.id !== 3);
        this.sortData.push({
          id: 3,
          name: 'Ponisti',
        });
        break;
      }
      case 'najveca zagadjenost': {
        this.cities = this.mappedCities
          .sort((a, b) => b.sumCo2 - a.sumCo2)
          .map((item, index) => {
            return {
              city: item.city,
              btClass:
                this.colors[Math.floor(Math.random() * this.colors.length)],
            };
          });
        this.zagadjenost = 'Najveca Zagadjenost';
        this.sortData = this.sortData.filter((item) => item.id !== 3);
        this.sortData.push({
          id: 3,
          name: 'Ponisti',
        });
        break;
      }
      case 'ponisti': {
        this.cities = this.originalCities;
        this.sortData = this.sortData.filter((item) => item.id !== 3);
        this.zagadjenost = 'Zagadjenost';
        break;
      }
      default: {
        this.zagadjenost = 'Zagadjenost';
        break;
      }
    }
  }

  public search() {
    this.searchInputControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          this.cities = this.originalCities.filter((item) =>
            item.city.toLowerCase().includes(value.toLowerCase())
          );
        }
        else {
          this.cities = this.originalCities;
        }
      });
  }

  public onRoute(item: any) {
    this.router.navigate([`/statistic/${item.city}`]);
  }

  public identity(index: number, el: any): string {
    return el;
  }

  ngOnDestroy(): void {}
}
