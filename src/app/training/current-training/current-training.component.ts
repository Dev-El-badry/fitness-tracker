import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  progressVal = 0;
  timer: number;
  constructor(public dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit() {
    this.startOrResumeTime();
  }

  startOrResumeTime() {
    const step = this.trainingService.getRunningExcerice().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progressVal = this.progressVal + 1;

      if (this.progressVal >= 100) {
        this.trainingService.complateExcerice();
        clearInterval(this.timer);
      }
    }, step);
  }

  stopProgress() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progressVal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.canceledExcerice(this.progressVal);
      } else {
        this.startOrResumeTime();
      }
    });
  }
}
