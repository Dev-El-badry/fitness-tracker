import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingComponent } from './training.component';


const router: Router = [
  { path: "", component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TrainingRoutingModule {}
