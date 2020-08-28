import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excerice } from '../excerice.model';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"]
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns: string[] = ["date", "name", "duration", "calories", "type"];
  dataSource = new MatTableDataSource<Excerice>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedTrainings).subscribe(
      excerices => {
        this.dataSource.data = excerices;
      }
    );
    this.trainingService.fetchExcericesWhenComplateOrCancel();
    //this.dataSource.data = this.trainingService.getExcericesWhenComplateOrCancel();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFiltering(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

}
