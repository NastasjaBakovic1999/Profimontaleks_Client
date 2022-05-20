import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkerDetailComponent } from './worker/worker-detail/worker-detail.component';
import { CardboardListComponent } from './productCardboard/cardboard-list/cardboard-list.component';
import { CardboardDetailComponent } from './productCardboard/cardboard-detail/cardboard-detail.component';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from "primeng/button";
import { BadgeModule } from "primeng/badge";
import { TableModule } from "primeng/table";
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkerListComponent,
    WorkerDetailComponent,
    CardboardListComponent,
    CardboardDetailComponent,
    HomeComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SkeletonModule,
    ButtonModule,
    BadgeModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
