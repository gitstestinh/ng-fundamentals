import {Component } from '@angular/core'

@Component({
    selector : 'events-list',
    template : `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr/>
        <event-thumbnail [event]="event1"> </event-thumbnail>
    </div>
    `
})
export class EventsListComponent {
    event1 = {
        id: 1,
        name: "Angular Connect",
         date: '9/27/2089',
         price: 32.99
    }
}