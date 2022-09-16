import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators, ControlContainer } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../../../services/servicios.service';
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { FormInventarioComponent } from '../../gestionar-inventario/form-inventario/form-inventario.component';



@Component({
  selector: 'app-form-servicio',
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.css']
})
export class FormServicioComponent implements OnInit {
  //formulario para registrar servicios
  formularioServicio: FormGroup = this.createFormGroup();
  idServiciosActualizar:any = null;

  constructor(private servicioService:ServiciosService, private _route:ActivatedRoute,private router: Router) {

   }



  ngOnInit(): void{

      this.idServiciosActualizar = this._route.snapshot.paramMap.get('id');
      if(this.idServiciosActualizar!==null){
          this.servicioService.getServiciosById(this.idServiciosActualizar).subscribe((servicio:any)=>{
            this.formularioServicio.get('Nombre')?.setValue(servicio.nombre);
            this.formularioServicio.get('Valor')?.setValue(servicio.valor);

          });

    }






  }


  get nombreNovalido(){
 return this.formularioServicio.get('Nombre')?.invalid && this.formularioServicio.get('Nombre')?.touched
  }


  get caracteristicaNovalidas(){
    return this.formularioServicio.get('Valor')?.invalid && this.formularioServicio.get('Valor')?.touched
     }



  createFormGroup() {
    //creacion del formulario de registro de servcios
    return new FormGroup({
      Nombre : new FormControl('',[Validators.required, Validators.minLength(3),
      ]),
      Valor: new FormControl('',[Validators.required,Validators.minLength(5), ]),
      // FechaCreacion: new FormControl(""


    });
  }

  registrarServicios(){
    //modal de validacion
    Swal.fire({
      title: 'Esta seguro que desea registrar este Servicio?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'registrar',
    }).then((result) => {
    //se ejecuta si el boton de registra se ejecuta
      if (result.isConfirmed) {
        //datos del formulario que voy a enviar en la peticion post
        const formData = new FormData();
        //estos datos tiene que ser los que estan en el dto
        formData.append("Nombre",this.formularioServicio.value.Nombre);
        formData.append("Valor",this.formularioServicio.value.Valor);
        // formData.append("FechaCreacion",this.formularioServicio.value.FechaCreacion);

        if(this.idServiciosActualizar!==null){
          formData.append("Id", this.idServiciosActualizar);
          this.servicioService.ActualizarServicios(formData).subscribe(()=>{

            Swal.fire('Se ha Actualizado', '', 'success').then(result=>{
              //redirecciona al componente de gestionar Productos
             this.router.navigate(['admin/gestionarServicios']);
             this.formularioServicio.reset();
           })

         })
        }else{


        ///hace que el servicio de registro se envie al back
        this.servicioService.insertarServicios(formData).subscribe((respuesta)=>{

          Swal.fire('Se ha registrado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarServicios']);
           this.formularioServicio.reset();


            console.log(this.formularioServicio);
            if (this.formularioServicio) {
            return Object.values(this.formularioServicio.controls).forEach(control => {
            control.markAsTouched();
            });

            }



         })

       })
      }
      }
    })



  }



}



