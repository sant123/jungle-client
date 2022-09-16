import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.css']
})
export class GestionarProductosComponent implements OnInit {
productos : any;
  constructor(private productosService:ProductosService, private router:Router ) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productosResultado)=>{

      // console.log(productosResultado)
      this.productos = productosResultado;
    })
  }

}
