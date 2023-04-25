import { Component, OnInit } from '@angular/core';
import { Diplome } from '../models/diplome.model';
import { DiplomeService } from '../service/diplome.service';
import { first } from 'rxjs/operators';
import { Specialite } from '../models/specialite.model';
import { SpecialiteService } from '../service/specialite.service';
import { DiplomeeService } from '../service/diplomee.service';
import { Diplomee } from '../models/diplomee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home.component.css']
})
export class HomeComponent implements OnInit {

  diplomes!: Diplome[];
  specialites!: Specialite[];
  diplomees!: Diplomee[];
  promotions!: string[];
  idDiplome!: number;
  diplomee!: Diplomee;

  constructor(
    private diplomeService: DiplomeService,
    private specialiteService: SpecialiteService,
    private diplomeeService: DiplomeeService,
  ) { }

  ngOnInit(): void {
    this.diplomeService.getAllDiplome()
            .pipe(first())
            .subscribe(diplomes => this.diplomes = diplomes);
    

  }

  getSpecialite(diplome: number) {
    this.specialiteService.getSpecialites(diplome)
        .pipe(first())
        .subscribe((diplomes: any) => this.specialites = diplomes);
}

  getPromotion(specialite: number) {
    this.idDiplome = specialite;
    this.diplomeeService.getPromotions(specialite)
        .pipe(first())
        .subscribe((diplomes: any) => this.promotions = diplomes);
      }

  getDiplomee(promo: string) {
    this.diplomeeService.getDiplomees(promo,this.idDiplome)
    .pipe(first())
    .subscribe((diplomes: any) => this.diplomees = diplomes);
    }

  getIdDiplome(id: number) {
    this.diplomeeService.getDiplomeeById(id)
    .subscribe(diplomee => this.diplomeeService.sendData(diplomee));
    this.diplomeeService.demandeAjout=false;
    this.diplomeeService.demandeMaj=false; 
  }
}
