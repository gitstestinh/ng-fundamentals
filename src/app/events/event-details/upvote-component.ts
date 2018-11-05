import { Component, Input, EventEmitter, Output } from "@angular/core";
import { preserveWhitespacesDefault } from "@angular/compiler";

@Component({
    selector: 'upvote',
    styleUrls:['./upvote.component.css'],
    template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
        <div class="well votingWidget">
            <div class="votingButton">
                <i [style.color]="iconColor" class="glyphicon glyphicon-heart"></i>
            </div>
            <div class="badge badge-inverse votingCount">
                <div>{{count}}</div>
            </div>
        </div>
    </div>
    `
})
export class UpvoteComponent{
    @Input() count: number;
    @Input() set voted(val){
        this.iconColor = val ? 'red': 'white';
    }
    @Output() vote = new EventEmitter();
    iconColor: string;

    onClick(){
        this.vote.emit({});
    }      
}