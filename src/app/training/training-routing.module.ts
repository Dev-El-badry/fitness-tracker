import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingComponent } from './training.component';


const router: Routes = [
  { path: "", component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TrainingRoutingModule {}
