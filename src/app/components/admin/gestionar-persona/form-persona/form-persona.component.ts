  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import Swal from 'sweetalert2';
  import { PersonaService } from 'src/app/services/persona.service';
  import { TipoDocumentoService } from '../../../../services/tipoDocumento.service';
  import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioXrolService } from 'src/app/services/usuarioXrol.service';
import { RolesService } from 'src/app/services/roles.service';




  @Component({
    selector: 'app-form-persona',
    templateUrl: './form-persona.component.html',
    styleUrls: ['./form-persona.component.css']
  })
  export class FormPersonaComponent implements OnInit {
  //formulario para registrar personas
  formularioPersona: FormGroup = this.createFormGroup();
  // agrego la variabe donde me va a guardar el arreglo
  tipoDocumentos:any=null;
  idPersonaActualizar:any = null;
  usuarioXroles:any=null;

  // agrego el servicio en el constructor donde voy a llamar el select
  constructor(private personaService:PersonaService,private tipoDocumentoService:TipoDocumentoService,private _route:ActivatedRoute, private usuarioXrolService:UsuarioXrolService,private rolesService:RolesService,private router: Router) { }




    ngOnInit(): void {
      // obtiene los datos del servicio que va traer lo que voy a mostrar en el select
       this.tipoDocumentoService.getTipoDocumento().subscribe((respuesta)=>{
      this.tipoDocumentos = respuesta;



      this.idPersonaActualizar = this._route.snapshot.paramMap.get('id');

      if(this.idPersonaActualizar!==null){
        this.personaService.getPersonaById(this.idPersonaActualizar).subscribe((persona:any)=>{
        console.log (persona);
          this.formularioPersona.get('Nombre')?.setValue(persona.nombre);
          this.formularioPersona.get('Apellido')?.setValue(persona.apellido);
          this.formularioPersona.get('Direccion')?.setValue(persona.direccion);
          this.formularioPersona.get('Telefono')?.setValue(persona.telefono);
          this.formularioPersona.get('IdTipoDocumento')?.setValue(persona.idTipoDocumento);
          this.formularioPersona.get('Correo')?.setValue(persona.correo);
          this.formularioPersona.get('FechaNacimiento')?.setValue(persona.fechaNacimiento);
          this.formularioPersona.get('NumeroDocumento')?.setValue(persona.numeroDocumento);
        })
      }

    })
    this.usuarioXrolService.getUsuarioXrol().subscribe((respuesta)=>{
      this.usuarioXroles = respuesta; })

    }
    get NombreNovalido(){
      return this.formularioPersona.get('Nombre')?.invalid && this.formularioPersona.get('Nombre')?.touched
       }

    get ApellidoNovalido(){
        return this.formularioPersona.get('Apellido')?.invalid && this.formularioPersona.get('Apellido')?.touched
         }

    get DireccionNovalido(){
          return this.formularioPersona.get('Direccion')?.invalid && this.formularioPersona.get('Direccion')?.touched
           }

    get TelefonoNovalido(){
           return this.formularioPersona.get('Telefono')?.invalid && this.formularioPersona.get('Telefono')?.touched
             }

    get IdTipoDocumentoNovalido(){
              return this.formularioPersona.get('IdTipoDocumento')?.invalid && this.formularioPersona.get('IdTipoDocumento')?.touched
               }

    get CorreoNovalido(){
                return this.formularioPersona.get('Correo')?.invalid && this.formularioPersona.get('Correo')?.touched
                 }
    get FechaNacimientoNovalido(){
                  return this.formularioPersona.get('FechaNacimiento')?.invalid && this.formularioPersona.get('FechaNacimiento')?.touched
                   }

     get NumeroDocumentoNovalido(){
                return this.formularioPersona.get('NumeroDocumento')?.invalid && this.formularioPersona.get('NumeroDocumento')?.touched
                 }


                 volver() {
                  location.href = '/admin/gestionarPersona';
                }


    createFormGroup() {
      //creacion del formulario de registro de personas
      return new FormGroup({
        Nombre: new FormControl("",[Validators.required,Validators.minLength(3), ]),
        Apellido: new FormControl("",[Validators.required,Validators.minLength(3), ]),
        Direccion: new FormControl("",[Validators.required,Validators.minLength(6), ]),
        Telefono: new FormControl("",[Validators.required,Validators.minLength(5), ]),
        IdTipoDocumento: new FormControl("",[Validators.required ]),
        Correo: new FormControl("",[Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        FechaNacimiento: new FormControl("",[Validators.required,Validators.minLength(3), ]),
        NumeroDocumento: new FormControl("",[Validators.required,Validators.minLength(3), ]),





      });
    }

    registrarPersona(){
      //modal de validacion
      Swal.fire({
        title: 'Esta seguro que desea registrar esta Persona',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'registrar',
      }).then((result) => {
      //se ejecuta si el boton de registra se ejecuta
        if (result.isConfirmed) {
          //datos del formulario que voy a enviar en la peticion post
          const formData = new FormData();
          //estos datos tiene que ser los que estan en el dto
          formData.append("Nombre", this.formularioPersona.value.Nombre);
          formData.append("Apellido", this.formularioPersona.value.Apellido);
          formData.append("Direccion", this.formularioPersona.value.Direccion);
          formData.append("Telefono", this.formularioPersona.value.Telefono);
          formData.append("IdTipoDocumento", this.formularioPersona.value.IdTipoDocumento);
          formData.append("Correo", this.formularioPersona.value.Correo);
          formData.append("FechaNacimiento", this.formularioPersona.value.FechaNacimiento);
          formData.append("NumeroDocumento", this.formularioPersona.value.NumeroDocumento);




      if(this.idPersonaActualizar!==null){
        formData.append("Id", this.idPersonaActualizar);
        this.personaService.ActualizarPersona(formData).subscribe((resultado)=>{

          Swal.fire('Se ha Actualizado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarPersona']);
           this.formularioPersona.reset();
         })

       })
      }
      else{
        this.personaService.insertarPersona(formData).subscribe((respuesta)=>{

          Swal.fire('Se ha registrado', '', 'success').then(result=>{
            //redirecciona al componente de gestionar Productos
           this.router.navigate(['admin/gestionarPersona']);
           this.formularioPersona.reset();
         })

       })
      }


        }
      })




    }




  }
