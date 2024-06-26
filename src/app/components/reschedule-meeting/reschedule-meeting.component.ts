import { AnimateTimings } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeetingServiceService } from 'src/services/meeting-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-reschedule-meeting',
  templateUrl: './reschedule-meeting.component.html',
  styleUrls: ['./reschedule-meeting.component.css'],
})
export class RescheduleMeetingComponent {
  constructor(
    private snack: MatSnackBar,
    private meetingService: MeetingServiceService,
    private snackBar: MatSnackBar
  ) {}

  MeetingForm = new FormGroup({
    id: new FormControl(''),
    meetingPlatform: new FormGroup({
      id: new FormControl(''),
    }),
    meetingType: new FormControl(''),
    meetingLink: new FormControl(''),
    meetingPassword: new FormControl(''),
    meetingDate: new FormControl(''),
    meetingTime: new FormControl(''),
    sprint: new FormGroup({
      sprintId: new FormControl(''),
    }),
    status: new FormControl('rescheduled'),
  });
  ngOnInit(): void {
    const Id = history.state.id;
    this.SearchForm.patchValue({
      id: Id,
    });
  }
  btnClick() {
    console.log('button clicekd');
  }
  flag: boolean = false;
  warn: boolean = false;
  SearchForm = new FormGroup({
    id: new FormControl(),
  });
  id: any;
  meeting: any;
  message: any;
  progressFlag: boolean = false;
  findMeeting(data: any) {
    // console.log(data.id);
    return this.meetingService
      .findById(data.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.message = 'No meeting exist with id:' + data.id;
            this.warn = true;
            this.flag = false;
            this.searchSnackBar();
            setTimeout(() => {
              this.warn = false;
            }, 3000);
          }
          return throwError(error);
        })
      )
      .subscribe((data) => {
        // console.warn('data', data);
        this.flag = true;
        this.warn = false;
        this.meeting = data;
        this.MeetingForm.patchValue({
          id: this.meeting.id,
          meetingPlatform: {
            id: this.meeting.meetingPlatform.id,
          },
          sprint: {
            sprintId: this.meeting.sprint.sprintId,
          },
          meetingType: this.meeting.meetingType,
          meetingLink: this.meeting.meetingLink,
          meetingPassword: this.meeting.meetingPassword,
          meetingDate: this.meeting.meetingDate,
          meetingTime: this.meeting.meetingTime,
          status: 'rescheduled',
        });
      });
  }
  searchSnackBar() {
    this.snackBar.open(this.message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  rescheduleMeeting(data: any) {
    console.warn(data);
    return this.meetingService
      .rescheduleMeeting(data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 200) {
            console.log('Success');
            this.message = 'Meeting rescheduled Successfully!';
            this.searchSnackBar();
            this.flag = false;
            this.SearchForm.patchValue({
              id: '',
            });
            this.MeetingForm.patchValue({
              id: '',
              meetingPlatform: {
                id: '',
              },
              sprint: {
                sprintId: '',
              },
              meetingType: '',
              meetingLink: '',
              meetingPassword: '',
              meetingDate: '',
              meetingTime: '',
              status: '',
            });
          }
          if (error.status == 400) {
            this.message = 'Completed Meeting cannot be rescheduled';
            this.searchSnackBar();
          }
          return throwError(error);
        })
      )
      .subscribe((response) => {
        console.log('Success');
        this.message = 'Meeting rescheduled Successfully!';
        this.SearchForm.patchValue({
          id: '',
        });
        this.SearchForm.markAsUntouched();
        this.searchSnackBar();
        this.flag = false;
      });
  }

  cancel() {
    this.flag = false;
    this.SearchForm.patchValue({
      id: '',
    });
  }
}
