import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioUsuario: FormGroup = this.createFormGroup();

  constructor(private usuarioService:UsuarioService,private router: Router) { }

  ngOnInit(): void {
  }


  validarIdentidad(){

    const formData = new FormData();
    //estos datos tiene que ser los que estan en el dto
    formData.append("Usuario", this.formularioUsuario.value.Usuario);
    formData.append("Password", this.formularioUsuario.value.Password);

    this.usuarioService.validarIdentidad(formData).subscribe(dataUsuario=>{

      console.log(dataUsuario)
      if(!dataUsuario){
        Swal.fire('Usuario y/o contraseña incorrectos', '', 'error').then(result=>{

       })
      }else{
        localStorage.setItem('userData',JSON.stringify(dataUsuario))
        this.router.navigate(['../admin/gestionarPersona']);
      }

    })
  }

  createFormGroup() {
    //creacion del formulario de registro de productos
    return new FormGroup({
      Usuario: new FormControl(""),
      Password: new FormControl(""),

    });
  }

}
