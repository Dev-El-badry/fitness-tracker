import { NgModule } from '@angular/core';

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { NextTrainingsComponent } from "./next-trainings/next-trainings.component";
import { StopTrainingComponent } from './current-training/stop-training.component';

import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NextTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule, TrainingRoutingModule, StoreModule.forFeature('training', trainingReducer)],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
