import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../service/user.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { User } from '../../models/user.model';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  username!: string;
  user!: User;

  constructor(
    private userService: UserService
  ) {this.userService.user.subscribe(x => this.user = x);}

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.username = user.nom_user+' '+user.prenom_user; 
  }

  ngAfterViewInit() { }

  logout() {
    this.userService.logout();
}
}
