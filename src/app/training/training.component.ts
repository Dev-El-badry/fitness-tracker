import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  isOpened = false;
  excericeSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.excericeSubscription = this.trainingService.changeStatus.subscribe(excerice => {
      if (excerice) {
        this.isOpened = true;
      } else {
        this.isOpened = false;
      }
    });
  }

}
