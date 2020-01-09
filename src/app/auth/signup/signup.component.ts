import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from "rxjs/Subscription";
import { UIService } from "../../shared/ui.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  loadingSubs: Subscription;
  constructor(private auth: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingSubs = this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });
  }

  submitForm(form: NgForm) {
    this.auth.registerUser({
      email: form.value.email,
      password: form.value.password
    });

    console.log(form);
  }

  ngOnDestroy() {
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }
}
