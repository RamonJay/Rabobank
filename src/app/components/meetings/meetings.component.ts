import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingServiceService } from 'src/services/meeting-service.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
})
export class MeetingsComponent {
  meetings: any;
  constructor(
    private meetingService: MeetingServiceService,
    private route: Router
  ) {
    this.meetingService.getAllMeeting().subscribe((response) => {
      this.meetings = response;
    });
  }

  rescheduleClick(id: any) {
    this.route.navigate(['rescheduleMeeting'], { state: { id } });
  }
}
