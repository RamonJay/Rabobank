import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprints } from 'src/app/components/interfaces/sprints';
import { MeetingPlatforms } from 'src/app/components/interfaces/meeting-platforms';
import { Url } from 'src/properties';

@Injectable({
  providedIn: 'root',
})
export class SprintManagementService {
  baseUrl: string = Url;
  constructor(private http: HttpClient) {}
  sprints(): Observable<Sprints[]> {
    return this.http.get<Sprints[]>(`${this.baseUrl}sprints`);
  }
  meetingPlatforms(): Observable<MeetingPlatforms[]> {
    return this.http.get<MeetingPlatforms[]>(
      `${this.baseUrl}meeting/platforms`
    );
  }
  addNewSprint(data: any) {
    return this.http.post(`${this.baseUrl}sprints/new`, data);
  }
}
