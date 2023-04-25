import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-add-diplomee',
  templateUrl: './add-diplomee.component.html',
  styleUrls: ['./add-diplomee.component.scss']
})
export class AddDiplomeeComponent implements OnInit {
  user!: User;
  form!: FormGroup;
  submitted = false;
  loading = false;
  sexes: any = ['','Homme','Femme'];
  sessions: any = ['','Principale','Rattrapage'];
  secteurs: any = ['','Public','Privé','Etranger','Chomage'];
  diplomes!: Diplome[];
  specialites!: Specialite[];
  diplome: any;
  diplomee!: Diplomee;
  
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
    ) {this.userService.user.subscribe(x => this.user = x);}

  ngOnInit(): void {
   
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaiss: ['', Validators.required],
      lieuNaiss: ['', Validators.required],
      promotion: ['', Validators.required],
      diplome: ['', Validators.required],
      specialite: ['', Validators.required],
      session: ['', Validators.required],
      travail: ['', Validators.required],
      email: ['', Validators.required],
      numTel: ['', Validators.required]
    })

    this.diplomeService.getAllDiplome()
            .pipe(first())
            .subscribe(diplomes => this.diplomes = diplomes);
  }

  getSpecialite() {
    this.specialiteService.getSpecialites(this.diplome.id)
        .pipe(first())
        .subscribe((specialites: any) => this.specialites = specialites);
}

  logConsole(msg:string) {
    console.log(msg);
  }

  get f() { return this.form.controls; }

  create(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.diplomeeService.createDiplomee(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Diplomé ajouté', { keepAfterRouteChange: true });
                    this.router.navigate(['../component/add-diplomee'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
  }

  send(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        
        this.demandeService.createDiplomee(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Demande d'ajout envoyée ! ", { keepAfterRouteChange: true });
                    this.router.navigate(['../component/add-diplomee'], { relativeTo: this.route });
                },
                error: error => {
                  this.alertService.error(error);
                  this.loading=false;
                }
            });
  }
}
