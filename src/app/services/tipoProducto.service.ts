import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  readonly BaseUrl = "https://localhost:44323/api/tipoproducto";
  constructor(private http: HttpClient) { }


  getTipoproducto() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }


}
