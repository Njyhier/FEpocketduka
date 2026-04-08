import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header-component/header-component';
import { FooterComponent } from './components/footer/footer-component/footer-component';
import { LoaderService } from './services/loader/loader-service';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pocketduka');
  constructor(private loaderService: LoaderService) {
    console.log(environment.CORE_URL);
  }
}
