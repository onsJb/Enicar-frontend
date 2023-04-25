import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Compte } from '../models/compte.model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { 
    }

  create(compte: Compte ) {
    console.log(compte);
    return this.http.post(`${environment.apiUrl}/accounts/add`, compte);
}

  getAll() {
    let user = JSON.parse(localStorage.getItem('user')!);
    console.log(user.id);
    return this.http.get<Compte[]>(`${environment.apiUrl}/accounts/${user.id}`);
}



update( ) {
  // return this.http.put(`${environment.apiUrl}/component/transfer/${idFrom}/${idTo}`, params)
  //     .pipe(map(x => {
          
  //             // update local storage
  //             const compte = { ...this.compteValue, ...params };
  //             localStorage.setItem('compte', JSON.stringify(compte));

  //             // publish updated user to subscribers
  //             this.compteSubject.next(compte);
          
  //         return x;
  //     }));
}

}
