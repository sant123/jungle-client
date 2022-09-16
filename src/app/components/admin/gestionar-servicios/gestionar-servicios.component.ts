import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServiciosService} from '../../../services/servicios.service';

@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./gestionar-servicios.component.css']
})
export class GestionarServiciosComponent implements OnInit {
  servicios:any;
  constructor(private serviciosService:ServiciosService, private router:Router) { }

  ngOnInit(): void {
    this.serviciosService.getServicios().subscribe((serviciosResultado)=>{
      this.servicios = serviciosResultado;
    })
  }

}
