import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkerDetailComponent } from './worker/worker-detail/worker-detail.component';
import { CardboardListComponent } from './productCardboard/cardboard-list/cardboard-list.component';
import { CardboardDetailComponent } from './productCardboard/cardboard-detail/cardboard-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkerListComponent,
    WorkerDetailComponent,
    CardboardListComponent,
    CardboardDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
