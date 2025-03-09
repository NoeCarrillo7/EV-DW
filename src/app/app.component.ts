import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactoComponent } from "./pages/contacto/contacto.component";
  
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ContactoComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Agenda de Contactos';
}
