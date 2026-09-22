import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader/loader-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pocketduka');
  constructor(private loaderService: LoaderService) {
    // console.log(environment.CORE_URL);
  }
}
