import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../../services/productos.service';
import { ActivatedRoute, Router } from "@angular/router";
import { TipoProductoService } from '../../../../services/tipoProducto.service';


@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',

})
export class FormProductoComponent implements OnInit {
  //formulario para registrar productos
  formularioProducto: FormGroup = this.createFormGroup();

  tipoProductos:any=null;

  idProductosActualizar:any = null;


  constructor(private productoService:ProductosService,private tipoProductoservice:TipoProductoService, private _route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.tipoProductoservice.getTipoproducto().subscribe((resultado)=>{
    this.tipoProductos = resultado;

    this.idProductosActualizar = this._route.snapshot.paramMap.get('id');

    if(this.idProductosActualizar!==null){

      this.productoService.getProductosById(this.idProductosActualizar).subscribe((productos:any)=>{
        console.log (productos);

        this.formularioProducto.get('Nombre')?.setValue(productos.nombre);
        this.formularioProducto.get('ValorUnitario')?.setValue(productos.valorUnitario);
        this.formularioProducto.get('RefereciaMarca')?.setValue(productos.refereciaMarca);
        this.formularioProducto.get('IdTipoProducto')?.setValue(productos.idTipoProducto);
        this.formularioProducto.get('FechaCreacion')?.setValue(productos.fechaCreacion);

      })
  }


    })



  }
  get NombreNovalido(){
    return this.formularioProducto.get('Nombre')?.invalid && this.formularioProducto.get('Nombre')?.touched
     }

  get ValorUnitarioNovalido(){
      return this.formularioProducto.get('ValorUnitario')?.invalid && this.formularioProducto.get('ValorUnitario')?.touched
       }

  get RefereciaMarcaNovalido(){
        return this.formularioProducto.get('RefereciaMarca')?.invalid && this.formularioProducto.get('RefereciaMarca')?.touched
         }

  get IdTipoProductoNovalido(){
          return this.formularioProducto.get('IdTipoProducto')?.invalid && this.formularioProducto.get('IdTipoProducto')?.touched
           }

  get FechaCreacionNovalido(){
            return this.formularioProducto.get('FechaCreacion')?.invalid && this.formularioProducto.get('FechaCreacion')?.touched
             }





  createFormGroup() {
    //creacion del formulario de registro de productos
    return new FormGroup({
      Nombre: new FormControl("",[Validators.required,Validators.minLength(3)]),
      ValorUnitario: new FormControl("",[Validators.required,Validators.minLength(3)]),
      RefereciaMarca: new FormControl("",[Validators.required,Validators.minLength(3)]),
      IdTipoProducto: new FormControl("",[Validators.required,Validators.minLength(1)]),
      FechaCreacion: new FormControl("",[Validators.required,Validators.minLength(3)])

    });
  }

  registrarProducto(){
    //modal de validacion
    Swal.fire({
      title: 'Esta seguro que desea registrar este producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'registrar',
    }).then((result) => {
    //se ejecuta si el boton de registra se ejecuta
      if (result.isConfirmed) {
        //datos del formulario que voy a enviar en la peticion post
        const formData = new FormData();
        //estos datos tiene que ser los que estan en el dto
        formData.append("Nombre", this.formularioProducto.value.Nombre);
        formData.append("ValorUnitario", this.formularioProducto.value.ValorUnitario);
        formData.append("RefereciaMarca", this.formularioProducto.value.RefereciaMarca);
        formData.append("IdTipoProducto", this.formularioProducto.value.IdTipoProducto);
        formData.append("FechaCreacion", this.formularioProducto.value.FechaCreacion);
        if(this.idProductosActualizar!==null){
          formData.append("Id", this.idProductosActualizar);
          this.productoService.ActualizarProductos(formData).subscribe((resultado)=>{
            Swal.fire('Se ha Actualizado', '', 'success').then(result=>{
              //redirecciona al componente de gestionar Productos
             this.router.navigate(['admin/gestionarProductos']);
             this.formularioProducto.reset();
           })

         })

        }else{
          ///hace que el servicio de registro se envie al back
          this.productoService.insertarProducto(formData).subscribe((respuesta)=>{
             Swal.fire('Se ha registrado', '', 'success').then(result=>{
               //redirecciona al componente de gestionar Productos
              this.router.navigate(['admin/gestionarProductos']);
              this.formularioProducto.reset();
            })

          })


    }
      }
    })




  }
}
