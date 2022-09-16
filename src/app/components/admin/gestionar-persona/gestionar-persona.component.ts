import { Component, Input, OnInit } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';


@Component({
  selector: 'app-gestionar-persona',
  templateUrl: './gestionar-persona.component.html',
  styleUrls: ['./gestionar-persona.component.css']
})
export class GestionarPersonaComponent implements OnInit {
  personas:any;
roles:any=null;

  constructor(private personaService:PersonaService, private rolesService:RolesService,private router:Router) { }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe((personasResultado)=>{
      this.personas = personasResultado;
    })

    this.rolesService.getRoles().subscribe((rolesResultado)=>{
      this.roles = rolesResultado;
    })


  }


}
