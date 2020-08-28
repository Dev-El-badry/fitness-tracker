import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excerice } from '../excerice.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraning from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: "app-next-trainings",
  templateUrl: "./next-trainings.component.html",
  styleUrls: ["./next-trainings.component.css"]
})
export class NextTrainingsComponent implements OnInit {
  excerices$: Observable<Excerice[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraning.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingService.fetchAvailableExcerice();
    this.excerices$ = this.store.select(fromTraning.getAvailableTrainings);
    this.fetchExcerices();
    this.store.select(fromTraning.getAvailableTrainings).subscribe(data => console.log(data));
    console.log(this.excerices$, 'exc');
    
  }

  fetchExcerices() {
    this.trainingService.fetchAvailableExcerice();
  }

  submitExcerice(form: NgForm) {
    this.trainingService.startExcerice(form.value.excerice);
  }

 
}
