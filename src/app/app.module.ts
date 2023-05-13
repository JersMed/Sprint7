import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomePageComponent } from './home/welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './home/modal/modal.component';
import { PanelComponent } from './home/panel/panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './home/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomePageComponent,
    ModalComponent,
    PanelComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
