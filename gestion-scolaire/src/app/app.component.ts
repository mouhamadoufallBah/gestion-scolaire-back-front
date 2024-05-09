import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'animate.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestion-scolaire';
}
