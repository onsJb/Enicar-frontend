import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { DiplomeeService } from '../../service/diplomee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  loading = false;
  sexes: any = ['','Homme','Femme'];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private diplomeeService: DiplomeeService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaiss: ['', Validators.required]
    })
  }

  get f() { return this.form.controls; }

  search(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.diplomeeService.searchDiplomee(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  this.router.navigate(['../info-diplomee'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
  }

}
