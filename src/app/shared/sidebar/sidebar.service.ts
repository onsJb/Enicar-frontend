import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './sidebar.metadata';
import { ROUTESADMIN, ROUTESUSER } from './menu-items';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMSUSER: RouteInfo[] = ROUTESUSER;
    MENUITEMSADMIN: RouteInfo[] = ROUTESADMIN;

    itemsUser = new BehaviorSubject<RouteInfo[]>(this.MENUITEMSUSER);
    itemsAdmin = new BehaviorSubject<RouteInfo[]>(this.MENUITEMSADMIN);

    constructor() {
    }
}
