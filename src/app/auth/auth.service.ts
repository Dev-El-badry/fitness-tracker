import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
  user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthenticateListener() {
    this.afAuth.authState.subscribe(user => {
     
      if (user) {
        this.store.dispatch(new Auth.SetAuthentication());
        console.log('gooooo!');
        
        this.router.navigate(["/training"]);
      } else {
        this.store.dispatch(new Auth.SetUnauthentication());
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingChangedStatus.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingChangedStatus.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingChangedStatus.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.snackbar(error.message, null, 3000);
      });
  }


  login(authData: AuthData) {
    // this.uiService.loadingChangedStatus.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingChangedStatus.next(false);
        this.store.dispatch(new UI.StopLoading());
        // this.initAuthenticateListener();
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingChangedStatus.next(false);
        this.uiService.snackbar(error.message, null, 3000);
      });
  }



  logout() {
    this.afAuth.auth.signOut();
  }


}
