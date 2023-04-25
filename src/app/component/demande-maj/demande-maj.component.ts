import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../service/demande.service';
import { DiplomeeService } from '../../service/diplomee.service';
import { first } from 'rxjs';
import { DemandeMaj } from '../../models/demandeMaj.model';
import { Diplomee } from '../../models/diplomee.model';
import { AlertService } from '../../service/alert.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-demande-maj',
  templateUrl: './demande-maj.component.html',
  styleUrls: ['./demande-maj.component.scss']
})
export class DemandeMajComponent implements OnInit {

  demandes!: DemandeMaj[];
  diplomee!: Diplomee;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private demandeService: DemandeService,
    private diplomeeService: DiplomeeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.user.subscribe(x => {
      if (!x)
      this.router.navigate(['../login']);
    });
 
    this.demandeService.getAllDemandeMaj()
            .pipe(first())
            .subscribe(
              {
                next: (demande ) => {
                    this.demandes = demande
                },
                error: error => {
                  
                  document.getElementById("alert")!.innerHTML = error;
                  // this.alertService.error(error);
                }
            }
              );
  }

  afficher(demande: DemandeMaj) {
    this.diplomeeService.getDiplomeeById(demande.idDiplomee)
            .pipe(first())
            .subscribe(diplomee => {
              diplomee.email = demande.email;
              diplomee.numTel = demande.numTel;
              diplomee.travail = demande.travail;           
              this.diplomeeService.sendData(diplomee)
              this.demandeService.demandeMaj = demande.id;
            });
    this.diplomeeService.demandeMaj=true;
    this.diplomeeService.demandeAjout=false;
  } 

}
