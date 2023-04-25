import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diplome } from '../models/diplome.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  private currentDiplome: Diplome;
  private diplomeSubject: BehaviorSubject<Diplome>;
  public diplome: Observable<Diplome>;

  constructor( private http: HttpClient ) 
  {
    this.currentDiplome = JSON.parse(localStorage.getItem('diplome')!);
    this.diplomeSubject = new BehaviorSubject<Diplome>(this.currentDiplome);
    this.diplome = this.diplomeSubject.asObservable();
   }

   public get diplomeValue(): Diplome {
    return this.diplomeSubject.value;
}


   sendData(data: any) {
    localStorage.setItem('diplome', JSON.stringify(data));
    this.diplomeSubject.next(data);
  }

  getAllDiplome() {
    return this.http.get<Diplome[]>(`${environment.apiUrl}/diplome/all`);
}

getDiplomeById(id: number): Observable<Diplome> {
  return this.http.get<Diplome>(`${environment.apiUrl}/diplome/${id}`);
}

}
