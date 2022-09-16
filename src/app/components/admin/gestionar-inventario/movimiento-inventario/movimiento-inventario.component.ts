import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../../../../services/productos.service';
import { TipoMovimientoInventarioService } from '../../../../services/tipoMovimientoInventario.service';
import { MovimientoInventarioService } from '../../../../services/movimientoInventario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movimiento-inventario',
  templateUrl: './movimiento-inventario.component.html',
  styleUrls: ['./movimiento-inventario.component.css']
})

export class MovimientoInventarioComponent implements OnInit {
  formularioMovimientoInventario: FormGroup = this.createFormGroup();

  @Input() inventario:any;
  productos:any;
  tipoMovimientoInventarios:any=null;
  movimientoInventario :any=null ;




  constructor(private productosService:ProductosService,private tipoMovimientoInventarioService:TipoMovimientoInventarioService, private movimientoInventarioService:MovimientoInventarioService,private router:Router) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productosResultado) =>{
      this.productos =productosResultado;


    });
    this.tipoMovimientoInventarioService.getTipoMovimientoInventario().subscribe((tipomovimientoinventarioVer)=>{
  this.tipoMovimientoInventarios=tipomovimientoinventarioVer;
    });

  this.movimientoInventarioService.getMovimientoInventario(this.inventario.id).subscribe((Vermovimientoinventario)=>{
  this.movimientoInventario=Vermovimientoinventario;

  });


  }
  get CantidadNovalido(){
    return this.formularioMovimientoInventario.get('Cantidad')?.invalid && this.formularioMovimientoInventario.get('Cantidad')?.touched
     }


  get IdProductosNovalido(){
        return this.formularioMovimientoInventario.get('IdProductos')?.invalid && this.formularioMovimientoInventario.get('IdProductos')?.touched
         }

  get IdTipoMovimientoInventarioNovalido(){
          return this.formularioMovimientoInventario.get('IdTipoMovimientoInventario')?.invalid && this.formularioMovimientoInventario.get('IdTipoMovimientoInventario')?.touched
           }


  createFormGroup() {
    //creacion del formulario de registro de productos
    return new FormGroup({
      Cantidad: new FormControl("",[Validators.required,Validators.minLength(1)]),
      IdProductos: new FormControl("",[Validators.required,Validators.minLength(1)]),
      IdInventario: new FormControl(""),
      IdTipoMovimientoInventario: new FormControl("",[Validators.required,])
    });
  }

  registrarMovimientoInventario(){
    console.log(this.formularioMovimientoInventario)
Swal.fire({
  title: 'registro de inventario hecho?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'registrar',
}).then((result)=>{
  if(result.isConfirmed){
    const formData = new FormData();
    formData.append("Cantidad", this.formularioMovimientoInventario.value.Cantidad);
    formData.append("IdProductos", this.formularioMovimientoInventario.value.IdProductos);
    formData.append("IdInventario", this.inventario.id);
    formData.append("IdTipoMovimientoInventario", this.formularioMovimientoInventario.value.IdTipoMovimientoInventario);

    this.movimientoInventarioService.insertarMovimientoInventario(formData).subscribe((respuestas)=>{

    Swal.fire('Se ha registrado','','success').then(result=>{

        this.router.navigate(['admin/gestionarMovimientoInventario']);
       this.formularioMovimientoInventario.reset();

    })




    })

  }

})
  }


}




// IdProductos,IdInventario,IdTipoMovimientoInventario hacer una insercion
