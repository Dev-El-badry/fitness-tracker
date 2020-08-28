import { Injectable } from '@angular/core';
import { Excerice } from './excerice.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
// import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
@Injectable()
export class TrainingService {

  private availableExcerice = [];
  afSub: Subscription[] = [];

  runningExcerice: Excerice;

  constructor(private db: AngularFirestore, private store: Store<fromTraining.State>) {}

  fetchAvailableExcerice() {
    // this.uiService.loadingChangedStatus.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afSub.push(this.db
      .collection("availableExcerices")
      .snapshotChanges()
      .pipe(
        map(docArray => {
         

            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories
              };
            });
        
        })
      )
      .subscribe((res: Excerice[]) => {
        this.store.dispatch(new Training.SetAvailableTrainings(res));
        this.store.dispatch(new UI.StopLoading());
      }));
  }

  startExcerice(selectedID: string) {
    // this.runningExcerice = this.availableExcerice.find(
    //   ex => ex.id === selectedID
    // );
    this.store.dispatch(new Training.SetStartTraining(selectedID));
    // this.changeStatus.next({ ...this.runningExcerice });
  }

  complateExcerice() {
    this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        type: 'complated',
        date: new Date()
      });
 
      this.store.dispatch(new Training.SetStopTraining());
    });
  }

  canceledExcerice(progress: number) {
    this.store.select(fromTraining.getActiveTrainings).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        calories: ex.calories * (progress / 100),
        duration: ex.duration * (progress / 100),
        type: 'cancel',
        date: new Date()
      });

      this.store.dispatch(new Training.SetStopTraining());
    });
   
  
  }

  getRunningExcerice() {
    return { ...this.runningExcerice };
  }

  cancelSubscriptions() {
    this.afSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  fetchExcericesWhenComplateOrCancel() {
    this.afSub.push(
      this.db
        .collection("finishExcerices")
        .valueChanges()
        .subscribe((excerices: Excerice[]) => {
          // this.finishExcericesChanges.next([...excerices]);
          this.store.dispatch(new Training.SetFinishedTrainings(excerices));
        })
    );
  }

  private addDataToDatabase(excerice: Excerice[]) {
    this.db.collection('finishExcerices').add(excerice);
  }
}
