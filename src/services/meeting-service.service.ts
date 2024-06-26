import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'src/properties';
@Injectable({
  providedIn: 'root',
})
export class MeetingServiceService {
  baseUrl = Url;
  constructor(private http: HttpClient) {}
  addNewMeeting(data: any) {
    return this.http.post(`${this.baseUrl}meeting/new`, data);
  }

  findById(id: any) {
    return this.http.get(`${this.baseUrl}meeting/${id}`);
  }

  rescheduleMeeting(data: any) {
    return this.http.put(`${this.baseUrl}meeting/${data.id}/reschedule`, data);
  }
  getAllMeeting() {
    return this.http.get(`${this.baseUrl}meetings`);
  }
}
