import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ControlContainer,
} from '@angular/forms';
import { CitaService } from '../../../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleCitaService } from '../../../../services/detalleCita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.css'],
})
export class FormCitasComponent implements OnInit {
  formularioCitas: FormGroup = this.createFormGroup();
  detalleCita: any = null;
  idCitaActualizar: any = null;
  horas: string[] = [];
  sedes: {
    nombre: string;
    direccion: string;
  }[] = [];
  barberos: {
    id: number;
    nombre: string;
    apellido: string;
  }[] = [];
  clientes: {
    id: number;
    nombre: string;
    apellido: string;
  }[] = [];

  constructor(
    private citaService: CitaService,
    private detalleCitaService: DetalleCitaService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // obtiene los datos del servicio que va traer lo que voy a mostrar en el select

    // this.detalleCitaService.getDetalleCita().subscribe((respuesta)=>{
    //   this.detalleCita=respuesta;

    //   this.idCitaActualizar = this._route.snapshot.paramMap.get('id');

    // })

    // this.idCitaActualizar = this._route.snapshot.paramMap.get('id');

    // if (this.idCitaActualizar !== null) {
    //   this.citaService
    //     .getCitaById(this.idCitaActualizar)
    //     .subscribe((cita: any) => {
    //       this.formularioCitas.get('Fecha')?.setValue(cita.fecha);
    //       this.formularioCitas.get('Hora')?.setValue(cita.hora);
    //     });
    // }

    this.citaService.getBarberos().subscribe((barberos: any) => {
      this.barberos = barberos;
    });

    this.citaService.getClientes().subscribe((clientes: any) => {
      this.clientes = clientes;
    });

    this.horas = [
      '09:00-09:30',
      '10:00-10:30',
      '11:00-11:30',
      '12:00-12:30',
      '13:00-13:30',
      '14:00-14:30',
      '15:00-15:30',
      '16:00-16:30',
      '17:00-17:30',
      '18:00-18:30',
      '19:00-19:30',
      '20:00-20:30',
      '21:00-21:30',
    ];

    this.sedes = [
      {
        nombre: 'Sede 1',
        direccion: 'Diagonal 47A Sur # 53A - 22, Barrio Venecia',
      },
      {
        nombre: 'Sede 2',
        direccion: 'Diagonal 49A Sur # 53A - 22, Barrio Venecia',
      },
    ];
  }

  get HoraNovalido() {
    return (
      this.formularioCitas.get('Hora')?.invalid &&
      this.formularioCitas.get('Hora')?.touched
    );
  }

  get FechaNovalido() {
    return (
      this.formularioCitas.get('Fecha')?.invalid &&
      this.formularioCitas.get('Fecha')?.touched
    );
  }

  get SedeNovalido() {
    return (
      this.formularioCitas.get('Sede')?.invalid &&
      this.formularioCitas.get('Sede')?.touched
    );
  }

  get IdUsuarioAgendaNovalido() {
    return (
      this.formularioCitas.get('IdUsuarioAgenda')?.invalid &&
      this.formularioCitas.get('IdUsuarioAgenda')?.touched
    );
  }

  get IdUsuarioAtiendeNovalido() {
    return (
      this.formularioCitas.get('IdUsuarioAtiende')?.invalid &&
      this.formularioCitas.get('IdUsuarioAtiende')?.touched
    );
  }

  createFormGroup() {
    return new FormGroup({
      Hora: new FormControl('', [Validators.required]),
      Fecha: new FormControl('', [Validators.required]),
      Sede: new FormControl('', [Validators.required]),
      IdUsuarioAgenda: new FormControl('', [Validators.required]),
      IdUsuarioAtiende: new FormControl('', [Validators.required]),
    });
  }

  async registrarCita() {
    const result = await Swal.fire({
      title: 'Esta seguro que desea registrar este Servicio',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'registrar',
    });

    if (!result.isConfirmed) {
      return;
    }

    const formData = new FormData();

    const [HoraInicio, HoraFin] = this.formularioCitas.value.Hora.split('-');

    formData.append('HoraInicio', HoraInicio);
    formData.append('HoraFin', HoraFin);
    formData.append('Fecha', this.formularioCitas.value.Fecha);
    formData.append('Sede', this.formularioCitas.value.Sede);
    formData.append('IdUsuarioAgenda', this.formularioCitas.value.IdUsuarioAgenda);
    formData.append('IdUsuarioAtiende', this.formularioCitas.value.IdUsuarioAtiende);





      if(this.idCitaActualizar!==null){
        formData.append("Id", this.idCitaActualizar);
        this.citaService.ActualizarCita(formData).subscribe((resultado)=>{

          Swal.fire('Se ha Actualizado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarCitas']);
           this.formularioCitas.reset();
         })

       })
      }
      else{
        this.citaService.insertarCita(formData).subscribe((respuesta) => {
            Swal.fire('Se ha registrado', '', 'success').then((result) => {
              //redirecciona al componente de gestionar Productos
              this.router.navigate(['admin/gestionarCitas']);
              this.formularioCitas.reset();

       });
      }


      )}


  }
}
    // this.citaService.insertarCita(formData).subscribe((respuesta) => {
    //   Swal.fire('Se ha registrado', '', 'success').then((result) => {
    //     //redirecciona al componente de gestionar Productos
    //     this.router.navigate(['admin/gestionarCitas']);
    //     this.formularioCitas.reset();
    //   });
    // });

    // if (this.idCitaActualizar !== null) {
    //   formData.append('Id', this.idCitaActualizar);
    //   this.citaService.ActualizarCita(formData).subscribe((resultado) => {
    //     Swal.fire('Se ha Actualizado', '', 'success').then((result) => {
    //       //redirecciona al componente de gestionar Productos
    //       this.router.navigate(['admin/gestionarCitas']);
    //       this.formularioCitas.reset();
    //     });
    //   });
    // } else {

    // }
