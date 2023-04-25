import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diplomee } from '../models/diplomee.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DemandeMaj } from '../models/demandeMaj.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  demandeMaj: any;
  demandeAjout: any;

  constructor(private http: HttpClient) { }

  createDiplomee(diplomee: Diplomee): Observable<Diplomee> {
    console.log(diplomee);
    return this.http.post<Diplomee>(`${environment.apiUrl}/demandeAjout/create`,diplomee);
  }

  getAllDemandeAjout() {
  return this.http.get<Diplomee[]>(`${environment.apiUrl}/demandeAjout/all`);
}

accepterDemandeAjout(diplomee:Diplomee): Observable<Diplomee> {
  let id = diplomee.id;
  diplomee.id=parseInt("");
  return this.http.post<Diplomee>(`${environment.apiUrl}/demandeAjout/accept/${id}`,diplomee);
}

rejeterDemandeAjout(diplomee:Diplomee): Observable<void> {
  return this.http.post<void>(`${environment.apiUrl}/demandeAjout/reject`,diplomee);
}

updateDiplomee(diplomee: Diplomee): Observable<Diplomee> {
  return this.http.post<Diplomee>(`${environment.apiUrl}/demandeMaj/create`,diplomee);
}

getAllDemandeMaj() {
  return this.http.get<DemandeMaj[]>(`${environment.apiUrl}/demandeMaj/all`);
}

accepterDemandeMaj(diplomee:Diplomee): Observable<Diplomee> {
  console.log(this.demandeMaj);
  return this.http.post<Diplomee>(`${environment.apiUrl}/demandeMaj/accept/${this.demandeMaj}`,diplomee);
}

rejeterDemandeMaj(): Observable<void> {
  return this.http.post<void>(`${environment.apiUrl}/demandeMaj/reject`,this.demandeMaj);
}

}
