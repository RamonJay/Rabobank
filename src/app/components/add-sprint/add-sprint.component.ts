import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintManagementService } from 'src/services/sprint-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css'],
})
export class AddSprintComponent {
  today: Date = new Date();
  message: any;
  flag: boolean = false;
  progressFlag: boolean = false;
  constructor(
    private sprintManagement: SprintManagementService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}
  SprintForm = new FormGroup({
    projectCode: new FormControl('', Validators.required),
    startDate: new FormControl('', [
      Validators.required,
      this.validateStartDate,
    ]),
    endDate: new FormControl('', [Validators.required, this.validateStartDate]),
  });
  sprint: any;

  validateStartDate(control: FormControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { invalidStartDate: true };
    }

    return null;
  }
  submitted(Sprint: any) {
    this.progressFlag = true;
    console.warn(Sprint);
    this.sprintManagement.addNewSprint(Sprint).subscribe(
      (data) => {
        this.sprint = data;
        this.message = 'New sprint is created with id:' + this.sprint.sprintId;
        this.flag = true;
        this.progressFlag = false;
        this.submitSnackBar();
        setTimeout(() => {
          this.SprintForm.setValue({
            projectCode: '',
            startDate: '',
            endDate: '',
          });
          this.SprintForm.untouched;
          this.flag = false;
        }, 3000);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 417) {
          this.message =
            'Duration between sprint start and End Date should be 1-4 Week';
          this.progressFlag = false;
          this.flag = true;
          this.submitSnackBar();
          setTimeout(() => {
            this.flag = false;
          }, 5000);
        }
      }
    );
  }
  submitSnackBar() {
    this.snackBar.open(this.message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  resetSnackVar() {
    if (!this.SprintForm.untouched) {
      this.snackBar.open('Field Resetted', 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
