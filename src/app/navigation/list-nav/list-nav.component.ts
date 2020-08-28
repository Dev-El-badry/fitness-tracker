import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: "app-list-nav",
  templateUrl: "./list-nav.component.html",
  styleUrls: ["./list-nav.component.css"]
})
export class ListNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscribtion: Subscription;
  constructor(private auth: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticate);
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.auth.logout();
  }
}
