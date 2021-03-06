import { VoterService } from './voter-service'
import { ISession } from '../shared';
import { of } from 'rxjs';

describe('VoterService', () => {
    let voterService : VoterService;
    let mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    })

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ["joe", "allison"]};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("allison");
        });

        it('should call the delete method with the right url', () => {
            var session = { id: 6, voters: ["joe", "allison"]};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')
        });
    });

    describe('addVoter', () => {
        it('should call the post with the right url', () => {
            var session = { id: 6, voters: ["joe", "allison"]};
            mockHttp.post.and.returnValue(of(false));

            voterService.addVoter(3, <ISession>session, "joe");

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object));
        });
    });
});