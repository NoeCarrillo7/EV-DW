import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Contacto {
  nombre: string;
  telefono: string;
  favorito: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Agenda de Contactos';

  // Lista de contactos
  contactos: Contacto[] = [];
  enviado = false;
  modoEdicion = false;
  indexEdicion: number | null = null;

  // Formulario Reactivo
  formContacto = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$') // Solo números de 10 dígitos
    ]),
    favorito: new FormControl(false)
  });

  // Método para agregar un contacto
  onSubmit() {
    this.enviado = true;

    if (this.formContacto.valid) {
      this.contactos.push(this.formContacto.value as Contacto);
      this.resetFormulario();
    }
  }

  // Seleccionar contacto
  seleccionarContacto(contacto: Contacto, index: number) {
    this.formContacto.setValue({
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      favorito: contacto.favorito
    });

    this.modoEdicion = true;
    this.indexEdicion = index;
  }

  // Modificar contacto
  modificarContacto() {
    if (this.indexEdicion !== null && this.formContacto.valid) {
      this.contactos[this.indexEdicion] = this.formContacto.value as Contacto;
      this.resetFormulario();
      this.modoEdicion = false;
      this.indexEdicion = null;
    }
  }

  // Eliminar contacto
  eliminarContacto(index: number) {
    this.contactos.splice(index, 1);
  }

  // Reiniciar formulario
  resetFormulario() {
    this.formContacto.reset();
    this.enviado = false;
  }
}
