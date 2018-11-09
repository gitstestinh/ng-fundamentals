import { Routes } from '@angular/router'
import { EventsListComponent } from "./events/events-list-component";
import { EventDetailsComponent } from "./events/event-details/event-details-component";
import { CreateEventComponent } from './events/create-event-component';
import { Error404Component } from './errors/404-component';
import { EventsListResolver } from './events/events-list-resolver';
import { CreateSessionComponent, EventResolver } from './events';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']}, //this has to go first, otherwise it will think we are trying to pass in an id
    { path: 'events', component: EventsListComponent, resolve:{ events:EventsListResolver}},
    { path: 'events/session/new', component: CreateSessionComponent},
    { path: 'events/:id', component: EventDetailsComponent, resolve:{event: EventResolver}},
    { path: '', redirectTo: 'events', pathMatch: 'full'},
    { path: 'user', loadChildren: 'src/app/user/user.module#UserModule'},
    { path: '404', component: Error404Component }
]