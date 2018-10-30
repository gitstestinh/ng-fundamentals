import { Routes } from '@angular/router'
import { EventsListComponent } from "./events/events-list-component";
import { EventDetailsComponent } from "./events/event-details/event-details-component";
import { CreateEventComponent } from './events/create-event-component';
import { Error404Component } from './errors/404-component';
import { EventRouteActivator } from './events/event-details/event-route-activator-service';
import { EventsListResolver } from './events/events-list-resolver';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']}, //this has to go first, otherwise it will think we are trying to pass in an id
    { path: 'events', component: EventsListComponent, resolve:{ events:EventsListResolver}},
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    { path: '', redirectTo: 'events', pathMatch: 'full'},
    { path: 'user', loadChildren: './user/user-module#UserModule'},
    { path: '404', component: Error404Component }
]