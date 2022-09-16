import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  infoUser:any=null;
  constructor() { }

  ngOnInit(): void {
    this.infoUser =  JSON.parse(localStorage.getItem('userData') || '')
    console.log(this.infoUser);
  }




}

