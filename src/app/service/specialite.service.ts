import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Specialite } from '../models/specialite.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DiplomeService } from './diplome.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private currentSpecialite: Specialite;
  private specialiteSubject: BehaviorSubject<Specialite>;
  public specialite: Observable<Specialite>;
  diplome: any;

  constructor( 
    private http: HttpClient,
    private diplomeService: DiplomeService,
    ) {
    this.currentSpecialite = JSON.parse(localStorage.getItem('specialite')!);
    this.specialiteSubject = new BehaviorSubject<Specialite>(this.currentSpecialite);
    this.specialite = this.specialiteSubject.asObservable();
   }

   public get specialiteValue(): Specialite {
    return this.specialiteSubject.value;
}

sendData(data: any) {
  localStorage.setItem('specialite', JSON.stringify(data));
  this.specialiteSubject.next(data);
  this.diplomeService.getDiplomeById(data.diplome!)
  .subscribe(diplome => this.diplomeService.sendData(diplome)); 
}

  getSpecialites(id: number) {
    return this.http.get<Specialite[]>(`${environment.apiUrl}/specialite/diplome/${id}`);
  }

  getSpecialiteById(id: number): Observable<Specialite> {
    return this.http.get<Specialite>(`${environment.apiUrl}/specialite/${id}`);
  }

}
