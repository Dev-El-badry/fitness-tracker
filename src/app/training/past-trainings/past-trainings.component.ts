import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excerice } from '../excerice.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"]
})
export class PastTrainingsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["date", "name", "duration", "calories", "type"];
  dataSource = new MatTableDataSource<Excerice>();
  trainingSubs: Subscription;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingSubs = this.trainingService.finishExcericesChanges.subscribe(
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

  ngOnDestroy() {
    if (this.trainingSubs) { this.trainingSubs.unsubscribe(); }
  }
}
