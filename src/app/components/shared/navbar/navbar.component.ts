import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cerrarSesion() {
    localStorage.removeItem('userData');
    location.href = '/home';
  }
}
// localStorage.removeItem("userData");
