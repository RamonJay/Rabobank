import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { AddSprintComponent } from './components/add-sprint/add-sprint.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { RescheduleMeetingComponent } from './components/reschedule-meeting/reschedule-meeting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomeComponent } from './components/home/home.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MeetingsComponent } from './components/meetings/meetings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddSprintComponent,
    AddMeetingComponent,
    RescheduleMeetingComponent,
    HomeComponent,
    NoPageFoundComponent,
    MeetingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    NgbAlertModule,
    NgbNavModule,
    NgbDatepicker,
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent],
})
export class AppModule {}
