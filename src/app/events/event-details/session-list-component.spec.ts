import { SessionListComponent} from './session-list-component'
import { ISession } from '../shared';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[{ name: 'Session 1', level: 'intermediate' }, { name: 'Session 3', level: 'intermediate' } , { name: 'Session 2', level: 'beginner' } ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2);
        });

        it('should sort the sessions correctly', () => {
            component.sessions = <ISession[]>[{ name: 'Session 1', level: 'intermediate' }, { name: 'Session 3', level: 'intermediate' } , { name: 'Session 2', level: 'beginner' } ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions[1].name).toBe('Session 3');
        });
    });
});