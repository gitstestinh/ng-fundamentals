import { Injectable } from '@angular/core'
import { IUser } from './user-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService{

    currentUser: IUser

    constructor(private http: HttpClient){}

    loginUser(userName: string, password: string){

        let loginInfo = { username: userName, password: password};
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.post('/api/login', loginInfo, options)
        .pipe(tap(data => {
            this.currentUser = <IUser>data['user'];
        }))
        .pipe(catchError(err => {
            return of(false);
        }));
    }

    updateCurrentUser(firstName: string, lastName: string){    
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    isAuthenticated(){ 
        return !!this.currentUser;
    }

    checkAuthenticationStatus(){
        this.http.get('/api/currentidentity').subscribe(data => {
            if(data instanceof Object){
                this.currentUser = <IUser>data;
            }
        })
    }

    logout(){
        this.currentUser = undefined;
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post('/api/logout', {}, options);
    }
}