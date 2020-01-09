import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { AuthService } from '../../auth/auth.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  isAuth = false;
  authSubscribtion: Subscription;

  constructor(private auth: AuthService) {
    this.authSubscribtion = this.auth.authChange.subscribe(resultStatus => {
      this.isAuth = resultStatus;
    });
  }

  ngOnInit() {}

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLoguot() {
    this.auth.logout();
  }

  onDestroy() {
    this.authSubscribtion.unsubscribe();
  }
}
