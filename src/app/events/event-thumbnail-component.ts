import { Component, Input } from '@angular/core'

@Component({
    selector : 'event-thumbnail',
    template: ` 
    <div class="well hoverwell thumbnail">
        <h2>{{event?.name}}</h2>
        <div>Date: {{event?.date}}</div>
        <div  [ngSwitch]="event?.time">Time: {{event?.time}}    
        <span *ngSwitchCase="'8:00am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00am'">(Late Start)</span>
        <span *ngSwitchDefault >(Normal Start)</span>
        </div>
      
        <div>Price: \${{event?.price}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left"></span>
            <span>{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">URL: {{event?.onlineUrl}}</div>
    </div>
    `,
    styles:[
        `.pad-left{ margin-left:10px; }`,
        `.well div { color: #bbb; }`,
        `.thumbnail { min-height: 210px}`
    ]
})
export class EventThumbnailComponent {
    @Input() event:any;
    someProperty:any = "some value";

    logFoo(){
        console.log('foo');
    }
}