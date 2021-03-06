import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth-service';
import { ISession, IEvent, EventService } from '../events';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar-component.html',
  styles:[
      `.nav.navbar-nav{
          font-size: 15px
      }`,
      `
      #searchForm {margin-right: 100px}
      `,
      `@media(max-width: 1200px){ #searchForm {display:none}}`,
      `li > a.active { color: #F97924;}`
  ]
})
export class NavBarComponent implements OnInit {

  searchTerm: string = "";
  foundSessions: ISession[];
  events: IEvent[];

  auth: AuthService

  constructor(private authService: AuthService, private eventService: EventService){   
    this.auth = authService
  }

  ngOnInit() {
    this.getEvents()
  }

  searchSessions(searchTerm: string){
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });

  }

  getEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
}