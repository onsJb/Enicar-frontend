import { Component, OnInit } from '@angular/core';
import { DiplomeeService } from '../../service/diplomee.service';
import { DemandeService } from '../../service/demande.service';
import { first } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diplomee } from '../../models/diplomee.model';
import { SpecialiteService } from '../../service/specialite.service';
import { DiplomeService } from '../../service/diplome.service';

@Component({
  selector: 'app-info-diplomee',
  templateUrl: './info-diplomee.component.html',
  styleUrls: ['./info-diplomee.component.scss','./info-diplomee.component.css']
})
export class InfoDiplomeeComponent implements OnInit {

  loading = false;
  diplomee: any;
  demandeAjout: any;
  demandeMaj: any;
  specialite: any;
  diplome: any;

  constructor(
    private alertService: AlertService,
    private diplomeeService: DiplomeeService,
    private diplomeService: DiplomeService,
    private demandeService: DemandeService,
    private specialiteService: SpecialiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.diplomeeService.diplomee.subscribe(x => { 
      this.diplomee = x;
      this.specialiteService.specialite.subscribe(x => { 
        this.specialite = x;
        this.diplomeService.diplome.subscribe(x => this.diplome = x);
      });
    });
    
   }

  ngOnInit(): void { 
  
    this.demandeAjout=this.diplomeeService.demandeAjout;
    this.demandeMaj=this.diplomeeService.demandeMaj;
}

  accepterAjout(){
    this.demandeService.accepterDemandeAjout(this.diplomee)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Diplomé acceptée! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../component/demande-ajout'], { relativeTo: this.route });
                }
            });
  }

  rejeterAjout(){
    this.demandeService.rejeterDemandeAjout(this.diplomee)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Diplomé rejetée! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../component/demande-ajout'], { relativeTo: this.route });
                }
            });
  }

  accepterMaj(){
    this.demandeService.accepterDemandeMaj(this.diplomee)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Demande acceptée! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../component/demande-ajout'], { relativeTo: this.route });
                }
    });
  }

  rejeterMaj(){
    this.demandeService.rejeterDemandeMaj()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Demande rejetée! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../component/demande-ajout'], { relativeTo: this.route });
                }
            });
  }

  modifier() {
    this.diplomeeService.sendData(this.diplomee);
  }

}
