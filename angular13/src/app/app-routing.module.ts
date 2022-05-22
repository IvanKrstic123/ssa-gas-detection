import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/Home.component';
import { NoContentComponent } from './components/NoContent/NoContent.component';
import { StatisticComponent } from './components/Statistic/Statistic.component';

const routes: Routes = [
  {path: '', redirectTo: 'home',  pathMatch: 'full'},
  {path: 'statistic/:id', component: StatisticComponent},
  {path: 'home', component: HomeComponent},
  {path: 'no-content', component: NoContentComponent},
  {path: '**', component: NoContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
