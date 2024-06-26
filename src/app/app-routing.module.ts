import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSprintComponent } from './components/add-sprint/add-sprint.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { RescheduleMeetingComponent } from './components/reschedule-meeting/reschedule-meeting.component';
import { HomeComponent } from './components/home/home.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { MeetingsComponent } from './components/meetings/meetings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'addSprint', component: AddSprintComponent, pathMatch: 'full' },
  { path: 'addMeeting', component: AddMeetingComponent, pathMatch: 'full' },
  {
    path: 'rescheduleMeeting',
    component: RescheduleMeetingComponent,
    pathMatch: 'full',
  },
  { path: 'meetings', component: MeetingsComponent, pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
