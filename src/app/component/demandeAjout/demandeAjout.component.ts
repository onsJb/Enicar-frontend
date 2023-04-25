import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../service/demande.service';
import { Diplomee } from '../../models/diplomee.model';
import { first } from 'rxjs';
import { DiplomeeService } from '../../service/diplomee.service';
import { DemandeMaj } from '../../models/demandeMaj.model';
import { AlertService } from '../../service/alert.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-ajout',
  templateUrl: './demandeAjout.component.html',
  styleUrls: ['./demandeAjout.component.scss']
})
export class DemandeAjoutComponent implements OnInit {

  demandes!: Diplomee[];
  diplomee!: any;

    constructor(
      private router: Router,
      private alertService: AlertService,
      private demandeService: DemandeService,
      private diplomeeService: DiplomeeService,
      private userService: UserService
      ) {}

    ngOnInit() {
      this.userService.user.subscribe(x => {
        if (!x)
        this.router.navigate(['../login']);
      });
        this.demandeService.getAllDemandeAjout()
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

    afficher(demande:Diplomee) {
      this.diplomeeService.sendData(demande);
      this.diplomeeService.demandeAjout=true;
      this.diplomeeService.demandeMaj=false;
    }        

}
