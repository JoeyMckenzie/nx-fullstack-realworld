import { Component, OnInit } from '@angular/core';

interface NavbarLink {
  displayName: string;
  route: string;
}

@Component({
  selector: 'nx-fullstack-realworld-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navbarLinks: NavbarLink[] = [
    {
      displayName: 'Home',
      route: '/',
    },
    {
      displayName: 'New Post',
      route: '/new-post',
    },
    {
      displayName: 'Settings',
      route: '/settings',
    },
    {
      displayName: 'Sign Up',
      route: '/users/register',
    },
  ];
}
