import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Permissions, Roles, User } from '../../model/AuthUser';
import { NavigationEnd, Router, Scroll } from '@angular/router';

enum NavItems {
  Home = '/',
  HowConso = '/comment-ça-marche/consommateur',
  HowPro = '/comment-ça-marche/professionnel',
  HowDGCCRF = '/mode-emploi-dgccrf',
  About = '/qui-sommes-nous',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('banner', {static: false}) banner;
  @ViewChild('navbarContent', {static: false}) navbarContent: ElementRef<any>;

  roles = Roles;
  permissions = Permissions;
  user: User;

  navItems = NavItems
  activeItem: NavItems;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
    });

    this.router.events.forEach((event) => {
      if (event instanceof Scroll) {
        this.banner.nativeElement.focus();
      }
      if (event instanceof NavigationEnd) {
        this.activeItem = NavItems[Object.keys(NavItems).find(key => encodeURI(NavItems[key]) === event.url)];
      }
    });
  }

  getNavItemDataToggle() {
    return (this.navbarContent && this.navbarContent.nativeElement.classList.contains('show')) ? 'collapse' : '';
  }

}
