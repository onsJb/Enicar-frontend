import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { AddDiplomeeComponent } from './add-diplomee/add-diplomee.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from '../home/home.component';
import { DemandeAjoutComponent } from './demandeAjout/demandeAjout.component';
import { InfoDiplomeeComponent } from './info-diplomee/info-diplomee.component';
import { EditDiplomeeComponent } from './edit-diplomee/edit-diplomee.component';
import { DemandeMajComponent } from './demande-maj/demande-maj.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    AddDiplomeeComponent,
    AccountComponent,
    SearchComponent,
    DemandeAjoutComponent,
    StatisticsComponent,
    HomeComponent,
    InfoDiplomeeComponent,
    EditDiplomeeComponent,
    DemandeMajComponent,
    AboutUsComponent
    ]
})
export class ComponentsModule { }
