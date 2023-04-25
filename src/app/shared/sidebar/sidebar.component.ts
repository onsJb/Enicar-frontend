import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTESADMIN, ROUTESUSER } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  user!: User;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItemsUser:RouteInfo[]=[];
  public sidebarnavItemsAdmin:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {this.userService.user.subscribe(x => this.user = x);}

  // End open close
  ngOnInit() {
    this.sidebarnavItemsUser = ROUTESUSER.filter(sidebarnavItem => sidebarnavItem);
    this.sidebarnavItemsAdmin = ROUTESADMIN.filter(sidebarnavItem => sidebarnavItem);
  }
}
