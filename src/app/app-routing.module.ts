import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './home/welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './home/history/history.component';

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent, pathMatch: 'full' },
  { path: 'homeApp', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: 'welcome.page.budget' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
