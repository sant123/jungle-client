import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.component.html',
  styleUrls: ['./gestionar-citas.component.css']
})
export class GestionarCitasComponent implements OnInit {
citas:any;
  constructor(private citaService:CitaService, private router:Router) { }

  ngOnInit(): void {
    this.citaService.getCita().subscribe((citaResultado)=>{
      this.citas = citaResultado;
      console.log(this.citas);

    })


  }

}
