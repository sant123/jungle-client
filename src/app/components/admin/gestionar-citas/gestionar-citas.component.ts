import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  async Eliminar(idCita:any){
    const result = await Swal.fire({
      title: 'Esta seguro que desea eliminar la cita',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'eliminar',
    });
    if (!result.isConfirmed) {
      return;
    }
    this.citaService.EliminarCita(idCita).subscribe(()=>{
      Swal.fire('Se ha Eliminado', '', 'success').then(result=>{
        //redirecciona al componente de gestionar Productos
      location.reload();
     })
    })
  }

}
