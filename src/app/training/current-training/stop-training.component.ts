import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-stop-training",
  template: `
    <h1 mat-dialog-title>Are Your Sure?</h1>
    <p mat-dialog-content
      >You Are Already Got {{ passedData.progress }}%</p
    >
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
  `
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData) {}
}
