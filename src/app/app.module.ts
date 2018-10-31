import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventsListResolver,
  CreateSessionComponent,
  SessionListComponent
} from './events/index'

import { NavBarComponent } from './nav/navbar-component';
import { ToastrService } from './common/toastr-service';

import { appRoutes} from './routes'
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404-component';
import { AuthService } from './user/auth-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    SessionListComponent,
    Error404Component,
    CreateEventComponent,
    CreateSessionComponent,
    NavBarComponent
  ],
  bootstrap: [EventsAppComponent],
  providers : [
    EventService, 
    ToastrService, 
    EventRouteActivator,
    AuthService,
    EventsListResolver,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: 
      checkDirtyState
  }
  ]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty){
    return window.confirm('you have not saved this event, do you really want to cancel?')
  }

  return true;
}
