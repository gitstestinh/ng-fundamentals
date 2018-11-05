import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "../shared";
import { AuthService } from "src/app/user/auth-service";
import { VoterService } from "./voter-service";

@Component({
    selector: 'session-list',
    templateUrl:'./session-list-component.html',
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    
    visibleSessions: ISession[] = [];

    constructor(private authService: AuthService, private voterService: VoterService){}

    //this gets called each time an input value changes
    ngOnChanges(){
        if(this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy == 'name' ? this.visibleSessions.sort(sortByNameAsc) : 
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(session, this.authService.currentUser.userName);
        }
        else{
            this.voterService.addVoter(session, this.authService.currentUser.userName);
        }

        if(this.sortBy === 'votes'){
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }
        
    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }

    filterSessions(filter){
        if(filter == 'all'){
            this.visibleSessions = this.sessions.slice(0); //creates duplicate instead of pointet
        }
        else{
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            });
        }
    }

}
function sortByNameAsc(session1:ISession, session2: ISession){
    if(session1.name > session2.name){
        return 1;
    }    
    else if(session1.name == session2.name){
        return 0;
    }

    return -1;
}

function sortByVotesDesc(session1:ISession, session2: ISession){
    return session2.voters.length - session1.voters.length;
}