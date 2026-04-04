import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdLoader } from '../../../components/loader/pd-loader/pd-loader';
import { LoaderService } from '../../../services/loader/loader-service';

@Component({
  selector: 'app-main-page-component',
  standalone: true,
  imports: [RouterModule, PdLoader],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.css',
})
export class MainPageComponent {
  loaderService = inject(LoaderService);
}
