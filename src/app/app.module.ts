import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AuthModule } from './auth/auth.module';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ListNavComponent } from './navigation/list-nav/list-nav.component';

// services
import { TrainingService } from './training/training.service';
import { AuthService } from './auth/auth.service';
import { UIService } from './shared/ui.service';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { reducers } from './app.reducer';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    ListNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
