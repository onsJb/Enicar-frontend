import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { DiplomeeService } from '../../service/diplomee.service';
import { DiplomeService } from '../../service/diplome.service';
import { SpecialiteService } from '../../service/specialite.service';
import { Diplome } from '../../models/diplome.model';
import { Specialite } from '../../models/specialite.model';
import { DemandeService } from '../../service/demande.service';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { Diplomee } from '../../models/diplomee.model';

@Component({
  selector: 'app-edit-diplomee',
  templateUrl: './edit-diplomee.component.html',
  styleUrls: ['./edit-diplomee.component.scss','./edit-diplomee.component.css']
})
export class EditDiplomeeComponent implements OnInit {

  user!: User;
  form!: FormGroup;
  submitted = false;
  loading = false;
  sexes: any = ['','Homme','Femme'];
  sessions: any = ['','Principale','Rattrapage'];
  secteurs: any = ['','Public','Privé','Etranger','Chomage'];
  diplomes!: Diplome[];
  specialites!: Specialite[];
  diplomee!: Diplomee;
  specialite!: any;
  diplome: any;
  newDiplomee!: Diplomee;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private diplomeeService: DiplomeeService,
    private diplomeService: DiplomeService,
    private specialiteService: SpecialiteService,
    private demandeService: DemandeService,
    private alertService: AlertService,
    private userService: UserService
    ) {
      this.userService.user.subscribe(x => this.user = x);
      this.diplomeeService.diplomee.subscribe(x => { 
        this.diplomee = x;
        this.newDiplomee=x;
        this.specialiteService.specialite.subscribe(x => { 
          this.specialite = x;
          this.diplomeService.diplome.subscribe(x => this.diplome = x);
        });
      });
    }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nom: new FormControl(this.diplomee.nom, Validators.required),
      prenom: new FormControl(this.diplomee.prenom, Validators.required),
      sexe: new FormControl(this.diplomee.sexe, Validators.required),
      dateNaiss: new FormControl(this.diplomee.dateNaiss, Validators.required),
      lieuNaiss: new FormControl(this.diplomee.lieuNaiss, Validators.required),
      promotion: new FormControl(this.diplomee.promotion, Validators.required),
      diplome: new FormControl(this.diplome.nom, Validators.required),
      specialite: new FormControl(this.specialite.nom, Validators.required),
      session: new FormControl(this.diplomee.session, Validators.required),
      travail: new FormControl(this.diplomee.travail, Validators.required),
      email: new FormControl(this.diplomee.email, Validators.required),
      numTel: new FormControl( this.diplomee.numTel, Validators.required)
    });

    this.diplomeService.getAllDiplome()
    .pipe(first())
    .subscribe(diplomes => this.diplomes = diplomes);
    
    this.specialiteService.getSpecialites(this.diplome.id)
    .pipe(first())
    .subscribe((specialites: any) => this.specialites = specialites);
}

  get f() { return this.form.controls; }

  save() {
    this.diplomeeService.updateDiplomee(this.newDiplomee)
    .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Diplômé modifié! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../home']);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
  }

  send() {
    this.demandeService.updateDiplomee(this.newDiplomee)
    .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Demande de mise à jour envoyée! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../home']);
                },
                error: error => {
                  this.alertService.error(error);
                    this.loading = false;
                }
            });

  }

}
