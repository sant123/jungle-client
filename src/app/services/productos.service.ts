import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  readonly BaseUrl = "https://localhost:44323/api/Productos";
  constructor(private http: HttpClient) { }


  getProductos() {
    //https://localhost:44324/api/producto -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }
      getProductosById(id:any) {
        //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
            return this.http.get(this.BaseUrl+'/'+id);

          }

          ActualizarProductos(formGroup:any) {
            return this.http.put(this.BaseUrl, formGroup);
          }

        //metodo para insertar club en la BD
  insertarProducto(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

}
