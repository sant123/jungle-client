import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../../services/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',

})
export class FormInventarioComponent implements OnInit {
  //formulario para registrar
  formularioInventario: FormGroup = this.createFormGroup();
  idInventarioActualizar:any = null;

  tipomovimientoinventarios :any =null;

  constructor(private inventarioService:InventarioService,private _route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.idInventarioActualizar = this._route.snapshot.paramMap.get('id');

    if(this.idInventarioActualizar!==null){

        this.inventarioService.getInventarioById(this.idInventarioActualizar).subscribe((inventario:any)=>{

          this.formularioInventario.get('Nombre')?.setValue(inventario.nombre);
        })
    }

}


get NombreNovalido(){
  return this.formularioInventario.get('Nombre')?.invalid && this.formularioInventario.get('Nombre')?.touched
   }


createFormGroup() {
  //creacion del formulario de registro de productos
  return new FormGroup({
    Nombre: new FormControl("",[Validators.required,Validators.minLength(3), ]),
  });
}

registrarInventario(){
  //modal de validacion
  Swal.fire({
    title: 'Està seguro de guardar el cambio?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'registrar',
  }).then((result) => {
  //se ejecuta si el boton de registra se ejecuta
    if (result.isConfirmed) {
      //datos del formulario que voy a enviar en la peticion post
      const formData = new FormData();
      //estos datos tiene que ser los que estan en el dto
      formData.append("Nombre", this.formularioInventario.value.Nombre);

      if(this.idInventarioActualizar!==null){
        formData.append("Id", this.idInventarioActualizar);
        this.inventarioService.actualizarInventario(formData).subscribe((respuesta)=>{

          Swal.fire('Se ha Actualizado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarInventario']);
           this.formularioInventario.reset();
         })

       })
      }else{
        this.inventarioService.insertarInventario(formData).subscribe((respuesta)=>{

          Swal.fire('Se ha registrado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarInventario']);
           this.formularioInventario.reset();
         })

       })
      }
      ///hace que el servicio de registro se envie al back


    }
  })




}



}
