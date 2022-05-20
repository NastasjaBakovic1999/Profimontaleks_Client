import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardboardDetailComponent } from './productCardboard/cardboard-detail/cardboard-detail.component';
import { CardboardListComponent } from './productCardboard/cardboard-list/cardboard-list.component';
import { WorkerDetailComponent } from './worker/worker-detail/worker-detail.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'workers', component: WorkerListComponent},
    {path: 'workers/:id', component: WorkerDetailComponent},
    {path: 'cardboards', component: CardboardListComponent},
    {path: 'cardboards/:id', component: CardboardDetailComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
