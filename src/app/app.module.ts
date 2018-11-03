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
  SessionListComponent,
  DurationPipe
} from './events/index'

import { CollapsibleWellComponent, TOASTR_TOKEN, Toastr, JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective } from './common/index';

import { NavBarComponent } from './nav/navbar-component';
import { appRoutes} from './routes'
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404-component';
import { AuthService } from './user/auth-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//register third party service interfaces
declare let toastr:Toastr
declare let jQuery:Object

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
    CollapsibleWellComponent,
    SessionListComponent,
    Error404Component,
    CreateEventComponent,
    CreateSessionComponent,
    NavBarComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    DurationPipe
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
