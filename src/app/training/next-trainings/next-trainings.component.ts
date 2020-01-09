import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excerice } from '../excerice.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: "app-next-trainings",
  templateUrl: "./next-trainings.component.html",
  styleUrls: ["./next-trainings.component.css"]
})
export class NextTrainingsComponent implements OnInit, OnDestroy {
  excerices: Excerice[] = [];
  excericesSubscription: Subscription;
  isLoading = false;
  loadingSubs: Subscription;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });
    this.trainingService.fetchAvailableExcerice();
    this.excericesSubscription = this.trainingService.changesStatus.subscribe(
      result => (this.excerices = result)
    );
  }

  submitExcerice(form: NgForm) {
    this.trainingService.startExcerice(form.value.excerice);
  }

  ngOnDestroy() {
    if (this.excericesSubscription) this.excericesSubscription.unsubscribe();
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }
}
