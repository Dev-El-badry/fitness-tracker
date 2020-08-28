import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import * as fromTraninig from './training.reducer';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  isOpened$: Observable<boolean>;
  constructor(private trainingService: TrainingService, private store: Store<fromTraninig.State>) { }

  ngOnInit() {
   this.isOpened$ = this.store.select(fromTraninig.getIsOpened);
  }

}
