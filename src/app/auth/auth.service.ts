import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  user: User;
  authChange = new Subject<boolean>();
  isAuthenticate = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthenticateListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(["/training"]);
        this.authChange.next(true);
        this.isAuthenticate = true;
      } else {
        this.trainingService.cancelSubscriptions();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingChangedStatus.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingChangedStatus.next(false);
      })
      .catch(error => {
        this.uiService.loadingChangedStatus.next(false);
        this.uiService.snackbar(error.message, null, 3000);
      });
  }


  login(authData: AuthData) {
    this.uiService.loadingChangedStatus.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingChangedStatus.next(false);
      })
      .catch(error => {
        this.uiService.loadingChangedStatus.next(false);
        this.uiService.snackbar(error.message, null, 3000);
      });
  }

  getUser() {
    return { ...this.user };
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticate;
  }
}
