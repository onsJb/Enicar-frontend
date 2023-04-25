import { Routes } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
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

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'alert',
				component: AlertComponent
			},
			{
				path: 'add-diplomee',
				component: AddDiplomeeComponent
			},
			{
				path: 'edit-diplomee',
				component: EditDiplomeeComponent
			},
			{
				path: 'demande-ajout',
				component: DemandeAjoutComponent
			},
			{
				path: 'account',
				component: AccountComponent
			},
			{
				path: 'search',
				component: SearchComponent
			},
			{
				path: 'statistics',
				component: StatisticsComponent
			},
			{
				path: 'info-diplomee',
				component: InfoDiplomeeComponent
			},
			{
				path: 'demande-maj',
				component: DemandeMajComponent
			},
			{
				path: 'about-us',
				component: AboutUsComponent
			}
		]
	}
];
