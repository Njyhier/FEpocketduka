import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo-component/logo-component';

@Component({
  selector: 'app-root',
  imports: [LogoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pocketduka');
}
