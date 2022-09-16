import { Component, OnInit } from '@angular/core';

import { InventarioService } from '../../../services/inventario.service';
import { MovimientoInventarioService } from '../../../services/movimientoInventario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-inventario',
  templateUrl: './gestionar-inventario.component.html',
  styleUrls: ['./gestionar-inventario.component.css']
})
export class GestionarInventarioComponent implements OnInit {
 inventario : any;
 inventarioSeleccionado:any=null;

  constructor(private inventarioService : InventarioService,private router:Router) { }

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe((inventarioMostrar)=>{
      this.inventario = inventarioMostrar;



    })

  }


  seleccionarInventario(inventario:any){
    this.inventarioSeleccionado = inventario;
  }

}
