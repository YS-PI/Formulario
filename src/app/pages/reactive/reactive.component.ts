import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup

  constructor( private fb: FormBuilder ) {

    this.crearFormulario();
    this.crearDataAlFormulario();

   }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }

  get nombreValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    });
  }

  crearDataAlFormulario(){

    //this.forma.setValue({
    this.forma.reset({
      nombre: '',
      apellido: '',
      correo: '',
      direccion: {
        distrito: '',
        ciudad: ''
      }
    });
  }

  agregarPasatiempo(){

    this.pasatiempos.push( this.fb.control(''));
  }

  borrarPasatiempo( i: number ){
    
    this.pasatiempos.removeAt(i);
  }

  guardar(){

    console.log(this.forma);

    if(this.forma.invalid){

      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched ());
        } else {
          control.markAsTouched();
        }

      });

    }
    // Posteo de información
    this.forma.reset({
      nombre: 'Sin nombre'
    });
  }


}
