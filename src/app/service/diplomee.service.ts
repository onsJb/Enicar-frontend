import { EventEmitter, Injectable } from '@angular/core';
import { Diplomee } from '../models/diplomee.model';
import { BehaviorSubject, Observable, Subject, first, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SpecialiteService } from './specialite.service';
import { ChartData } from '../models/chartData.model';



@Injectable({
  providedIn: 'root'
})
export class DiplomeeService {
  private currentDiplomee: Diplomee;
  private diplomeeSubject: BehaviorSubject<Diplomee>;
  public diplomee: Observable<Diplomee>;

  private myData = new Subject<any>();
  demandeAjout = false;
  demandeMaj = false;

  constructor(
    private http: HttpClient,
    private specialiteService: SpecialiteService

    ) { 
      this.currentDiplomee = JSON.parse(localStorage.getItem('diplomee')!);
      this.diplomeeSubject = new BehaviorSubject<Diplomee>(this.currentDiplomee);
      this.diplomee = this.diplomeeSubject.asObservable();
    }

    public get diplomeeValue(): Diplomee {
      return this.diplomeeSubject.value;
  }

    sendData(data: any) {
      localStorage.setItem('diplomee', JSON.stringify(data));
      this.diplomeeSubject.next(data);
      this.specialiteService.getSpecialiteById(data.specialite)
      .subscribe(specialite => this.specialiteService.sendData(specialite));
    }

  createDiplomee(diplomee: Diplomee): Observable<Diplomee> {
    return this.http.post<Diplomee>(`${environment.apiUrl}/diplomee/create`,diplomee);
  }

  getPromotions(id: number) {
    return this.http.get<string[]>(`${environment.apiUrl}/diplomee/promotion/${id}`);
}

  getDiplomees(promo: string,specialite: number) {
  return this.http.get<Diplomee[]>(`${environment.apiUrl}/diplomee/${specialite}/${promo}`);
}

getDiplomeeById(id: number): Observable<Diplomee> {
  return this.http.get<Diplomee>(`${environment.apiUrl}/diplomee/${id}`);
}

updateDiplomee(diplomee: Diplomee): Observable<Diplomee> {
  console.log(diplomee);
  return this.http.put<Diplomee>(`${environment.apiUrl}/diplomee/update`, diplomee);
}

searchDiplomee(diplomee: Diplomee): Observable<Diplomee> {
  console.log(diplomee);
  let dip = this.http.post<Diplomee>(`${environment.apiUrl}/diplomee/search`,diplomee);
  dip.subscribe(diplomee => this.sendData(diplomee));
  this.demandeAjout=false; 
  this.demandeMaj=false; 
  return dip;
}

getChartDiplome(travail:String): Observable<Array<ChartData>> {
  return this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${travail}`).pipe(map((d:Array<ChartData>)=>d));
}

}
