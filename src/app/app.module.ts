import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { EventsAppComponent } from './events-app.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventResolver,
  EventsListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService
} from './events/index'

import { CollapsibleWellComponent, TOASTR_TOKEN, Toastr, JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective } from './common/index';

import { NavBarComponent } from './nav/navbar-component';
import { appRoutes} from './routes'
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404-component';
import { AuthService } from './user/auth-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationValidator } from './events/location-validator-directive';

//register third party service interfaces
declare let toastr:Toastr
declare let jQuery:Object

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CollapsibleWellComponent,
    SessionListComponent,
    Error404Component,
    CreateEventComponent,
    CreateSessionComponent,
    NavBarComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    DurationPipe,
    LocationValidator
  ],
  bootstrap: [EventsAppComponent],
  providers : [
    EventService, 
    {
      provide: TOASTR_TOKEN, useValue: toastr //this is how you wrap third party libs for dependency injection
    }, 
    {
      provide: JQ_TOKEN, useValue: jQuery
    },
    EventResolver,
    AuthService,
    VoterService,
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
