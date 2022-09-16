import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  readonly BaseUrl = "https://localhost:44323/api/tipoDocumento";
  constructor(private http: HttpClient) { }


  getTipoDocumento() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }


}
