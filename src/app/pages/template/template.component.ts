import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {


  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: ''
  }

  paises: any[] = [];

  constructor( private paisServices: PaisService) { }

  ngOnInit(): void {
    this.paisServices.getPaises()
        .subscribe( paises => {
          this.paises = paises;

          this.paises.unshift({
            nombre: '[Seleccioner Pais]',
            codigo: ''
          })

          //console.log( this.paises );
        });
  }

  guardar( forma: NgForm ){
    console.log( forma );
    
    if(forma.invalid){

      Object.values( forma.controls ).forEach( control => {
        control.markAllAsTouched();
      });

      return;
    }
    console.log( forma.value);
  }

}
