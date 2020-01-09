import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: "app-list-nav",
  templateUrl: "./list-nav.component.html",
  styleUrls: ["./list-nav.component.css"]
})
export class ListNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth = false;
  authSubscribtion: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.authSubscribtion = this.auth.authChange.subscribe(resultStatus => {
      this.isAuth = resultStatus;
    });
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.auth.logout();
  }
}
