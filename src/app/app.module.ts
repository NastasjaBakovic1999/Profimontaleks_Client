import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputMaskModule } from 'primeng/inputmask';
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
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import { WorkerService } from './worker/services/worker.service';
import { ProductCardboardService } from './productCardboard/services/product-cardboard.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
    WorkerListComponent,
    WorkerDetailComponent,
    CardboardListComponent,
    CardboardDetailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SkeletonModule,
    ButtonModule,
    BadgeModule,
    TableModule,
    HttpClientModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    PanelModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  providers: [
    FormBuilder, 
    MessageService, 
    ConfirmationService, 
    WorkerService, 
    ProductCardboardService, 
    DecimalPipe, 
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
