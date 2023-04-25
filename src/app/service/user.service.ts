import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUser: User;
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private location: Location
) {
        this.currentUser = JSON.parse(localStorage.getItem('user')!);
        this.userSubject = new BehaviorSubject<User>(this.currentUser);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(user: User){
        return this.httpClient.post(`${environment.apiUrl}/user/login`,user)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        window.location.replace('/');
    }

//     register(user: User) {
//         return this.http.post(`${environment.apiUrl}/users/register`, user);
//     }

//     getAll() {
//         return this.http.get<User[]>(`${environment.apiUrl}/users`);
//     }

//     getById(id: string) {
//         return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
//     }

//     update(id: string, params: any) {
//         return this.http.put(`${environment.apiUrl}/users/${id}`, params)
//             .pipe(map(x => {
//                 // update stored user if the logged in user updated their own record
//                 if (id == this.userValue?.id) {
//                     // update local storage
//                     const user = { ...this.userValue, ...params };
//                     localStorage.setItem('user', JSON.stringify(user));

//                     // publish updated user to subscribers
//                     this.userSubject.next(user);
//                 }
//                 return x;
//             }));
//     }

//     delete(id: string) {
//         return this.http.delete(`${environment.apiUrl}/users/${id}`)
//             .pipe(map(x => {
//                 // auto logout if the logged in user deleted their own record
//                 if (id == this.userValue?.id) {
//                     this.logout();
//                 }
//                 return x;
//             }));
//     }
}