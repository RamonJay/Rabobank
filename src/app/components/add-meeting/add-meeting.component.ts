import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SprintManagementService } from 'src/services/sprint-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeetingServiceService } from 'src/services/meeting-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Sprints } from '../interfaces/sprints';
import { MeetingPlatforms } from '../interfaces/meeting-platforms';
@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css'],
})
export class AddMeetingComponent implements OnInit {
  sprints: Sprints[] = [];
  MeetingPlatforms: MeetingPlatforms[] = [];
  message: string = '';
  flag: boolean = false;
  constructor(
    private sprintsData: SprintManagementService,
    private snackBar: MatSnackBar,
    private meetingservice: MeetingServiceService
  ) {}
  ngOnInit(): void {
    this.sprintsData.sprints().subscribe((data) => {
      this.sprints = data;
    });
    this.sprintsData.meetingPlatforms().subscribe((data) => {
      this.MeetingPlatforms = data;
    });
  }

  progressFlag: boolean = false;

  MeetingForm = new FormGroup({
    meetingTime: new FormControl('', Validators.required),
    meetingType: new FormControl('', Validators.required),
    sprint: new FormGroup({
      sprintId: new FormControl('', Validators.required),
    }),
    meetingPassword: new FormControl('', Validators.required),
    status: new FormControl('scheduled', Validators.required),
    meetingPlatform: new FormGroup({
      id: new FormControl('', Validators.required),
    }),
    meetingLink: new FormControl('', Validators.required),
  });

  meetingSubmit(meeting: any) {
    this.progressFlag = true;
    this.meetingservice
      .addNewMeeting(meeting)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.message = 'Meeting scheduled';
            this.flag = true;
            this.submitSnackBar();
            this.MeetingForm.patchValue({
              meetingTime: '',
              meetingLink: '',
              meetingPassword: '',
              meetingPlatform: {
                id: '',
              },
              meetingType: '',
              status: 'scheduled',
              sprint: {
                sprintId: '',
              },
            });
            this.progressFlag = false;
            setTimeout(() => {
              this.flag = false;
            }, 2000);
          }
          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.message = 'Meeting created';
        this.progressFlag = false;
        this.submitSnackBar();
        setTimeout(() => {
          this.MeetingForm.reset();
          this.flag = false;
        }, 2000);
      });
  }
  submitSnackBar() {
    this.snackBar.open(this.message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.progressFlag = false;
  }
  resetSnackVar() {
    if (!this.MeetingForm.untouched) {
      this.snackBar.open('Field Resetted', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.progressFlag = false;
    }
  }
}
