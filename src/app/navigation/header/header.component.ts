import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from "@angular/core";
import { AuthService } from '../../auth/auth.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscribtion: Subscription;

  constructor(private auth: AuthService, private store: Store<fromRoot.State>) {
  
   
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticate);
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLoguot() {
    this.auth.logout();
  }


}
