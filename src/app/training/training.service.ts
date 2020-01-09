import { Injectable } from '@angular/core';
import { Excerice } from './excerice.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {
  changeStatus = new Subject<Excerice>();
  changesStatus = new Subject<Excerice[]>();
  finishExcericesChanges = new Subject<Excerice[]>();
  private availableExcerice: Excerice[] = [];
  afSub: Subscription[] = [];

  runningExcerice: Excerice;

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExcerice() {
    this.uiService.loadingChangedStatus.next(true);
    this.afSub.push(this.db
      .collection("availableExcerices")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            const data = doc.payload.doc.data() as Excerice[];
            const id = doc.payload.doc.id;

            return {
              id,
              ...data
            };
          });
        })
      )
      .subscribe((res: Excerice[]) => {
        this.availableExcerice = res;
        this.changesStatus.next([...this.availableExcerice]);
        this.uiService.loadingChangedStatus.next(false);
      }));
  }

  startExcerice(selectedID: string) {
    this.runningExcerice = this.availableExcerice.find(
      ex => ex.id === selectedID
    );
    this.changeStatus.next({ ...this.runningExcerice });
  }

  complateExcerice() {
    this.addDataToDatabase({
      ...this.runningExcerice,
      type: 'complated',
      date: new Date()
    });
    this.runningExcerice = null;
    this.changeStatus.next(null);
  }

  canceledExcerice(progress: number) {
    this.addDataToDatabase({
      ...this.runningExcerice,
      duration: this.runningExcerice.duration * (progress / 100),
      calories: this.runningExcerice.calories * (progress / 100),
      type: "cancel",
      date: new Date()
    });
    this.runningExcerice = null;
    this.changeStatus.next(null);
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
          this.finishExcericesChanges.next([...excerices]);
        })
    );
  }

  private addDataToDatabase(excerice: Excerice[]) {
    this.db.collection('finishExcerices').add(excerice);
  }
}
