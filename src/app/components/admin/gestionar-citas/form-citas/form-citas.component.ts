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
import { EstadoService } from '../../../../services/estado.service';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.css'],
})
export class FormCitasComponent implements OnInit {
  formularioCitas: FormGroup = this.createFormGroup();
  detalleCita: any = null;
  idCitaActualizar: any = null;
  citas: {
    id: number;
    horaInicio: string;
    horaFin: string;
    fecha: string;
    sede: string;
    idUsuarioAgenda: number;
    idUsuarioAtiende: number;
    idEstado: number;
    barbero: string;
    cliente: string;
  }[] = [];
  horas: {
    id: string;
    hora: string;
  }[] = [];
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
  estados: {
    id: number;
    nombre: string;
  }[] = [];

  constructor(
    private citaService: CitaService,
    private detalleCitaService: DetalleCitaService,
    private _route: ActivatedRoute,
    private router: Router,
    private estadoService: EstadoService
  ) {}

  ngOnInit(): void {
    // obtiene los datos del servicio que va traer lo que voy a mostrar en el select

    this.citaService.getCita().subscribe((citaResultado: any) => {
      this.citas = citaResultado;
    });

    this.idCitaActualizar = this._route.snapshot.paramMap.get('id');

    if (this.idCitaActualizar !== null) {
      this.idCitaActualizar = Number(this.idCitaActualizar);
      this.citaService
        .getCitaById(this.idCitaActualizar)
        .subscribe((cita: any) => {
          this.formularioCitas
            .get('Hora')
            ?.setValue(cita.horaInicio + '-' + cita.horaFin);
          // this.formularioCitas.get('HoraFin')?.setValue(cita.horaFin);
          this.formularioCitas.get('Fecha')?.setValue(cita.fecha.slice(0, 10));
          this.formularioCitas.get('Sede')?.setValue(cita.sede);
          this.formularioCitas
            .get('IdUsuarioAgenda')
            ?.setValue(cita.idUsuarioAgenda);
          this.formularioCitas
            .get('IdUsuarioAtiende')
            ?.setValue(cita.idUsuarioAtiende);
          this.formularioCitas.get('IdEstado')?.setValue(cita.idEstado);

          console.log(cita);
        });
    }

    this.citaService.getBarberos().subscribe((barberos: any) => {
      this.barberos = barberos;
    });

    this.citaService.getClientes().subscribe((clientes: any) => {
      this.clientes = clientes;
    });

    this.estadoService.getEstados().subscribe((estados: any) => {
      this.estados = estados;
    });
    this.horas = [
      { id: '09:00:00-09:30:00', hora: '09:00-09:30' },
      { id: '10:00:00-10:30:00', hora: '10:00-10:30' },
      { id: '11:00:00-11:30:00', hora: '11:00-11:30' },
      { id: '12:00:00-12:30:00', hora: '12:00-12:30' },
      { id: '13:00:00-13:30:00', hora: '13:00-13:30' },
      { id: '14:00:00-14:30:00', hora: '14:00-14:30' },
      { id: '15:00:00-15:30:00', hora: '15:00-15:30' },
      { id: '16:00:00-16:30:00', hora: '16:00-16:30' },
      { id: '17:00:00-17:30:00', hora: '17:00-17:30' },
      { id: '18:00:00-18:30:00', hora: '18:00-18:30' },
      { id: '19:00:00-19:30:00', hora: '19:00-19:30' },
      { id: '20:00:00-20:30:00', hora: '20:00-20:30' },
      { id: '21:00:00-21:30:00', hora: '21:00-21:30' },
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

  get IdEstadoNovalido() {
    return (
      this.formularioCitas.get('IdEstado')?.invalid &&
      this.formularioCitas.get('IdEstado')?.touched
    );
  }
  volver() {
    location.href = '/admin/gestionarCitas';
  }
  createFormGroup() {
    return new FormGroup({
      Hora: new FormControl('', [Validators.required]),
      Fecha: new FormControl('', [Validators.required]),
      Sede: new FormControl('', [Validators.required]),
      IdUsuarioAgenda: new FormControl('', [Validators.required]),
      IdUsuarioAtiende: new FormControl('', [Validators.required]),
      IdEstado: new FormControl('', [Validators.required]),
    });
  }

  async registrarCita(): Promise<any> {
    const result = await Swal.fire({
      title: 'Esta seguro que desea registrar cita',
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
    formData.append(
      'IdUsuarioAgenda',
      this.formularioCitas.value.IdUsuarioAgenda
    );
    formData.append(
      'IdUsuarioAtiende',
      this.formularioCitas.value.IdUsuarioAtiende
    );
    formData.append('IdEstado', this.formularioCitas.value.IdEstado);

    let permiteInsertar = true;

    for (let cita of this.citas) {

      if (cita.id === this.idCitaActualizar) {
        continue;
      }

      if (
        cita.horaInicio === HoraInicio &&
        cita.horaFin === HoraFin &&
        cita.fecha.split('T')[0] === this.formularioCitas.value.Fecha &&
        cita.idUsuarioAgenda == this.formularioCitas.value.IdUsuarioAgenda
      ) {
        permiteInsertar = false;
        break;
      }
    }

    if (!permiteInsertar) {
      return Swal.fire(
        'Ya hay una cita existente con esos datos',
        '',
        'warning'
      );
    }

    if (this.idCitaActualizar !== null) {
      formData.append('Id', this.idCitaActualizar);
      this.citaService.ActualizarCita(formData).subscribe((resultado) => {
        Swal.fire('Se ha Actualizado', '', 'success').then((result) => {
          //redirecciona al componente de gestionar Productos
          this.router.navigate(['admin/gestionarCitas']);
          this.formularioCitas.reset();
        });
      });
    } else {
      this.citaService.insertarCita(formData).subscribe((respuesta) => {
        Swal.fire('Se ha registrado', '', 'success').then((result) => {
          //redirecciona al componente de gestionar Productos
          this.router.navigate(['admin/gestionarCitas']);
          this.formularioCitas.reset();
        });
      });
    }
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
