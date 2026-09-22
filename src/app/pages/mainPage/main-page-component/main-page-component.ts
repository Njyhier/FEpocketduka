import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdLoader } from '../../../components/loader/pd-loader/pd-loader';
import { LoaderService } from '../../../services/loader/loader-service';
import { HeaderComponent } from '../../../components/header/header-component/header-component';

@Component({
  selector: 'app-main-page-component',
  standalone: true,
  imports: [RouterModule, PdLoader, HeaderComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.css',
})
export class MainPageComponent {
  loaderService = inject(LoaderService);
}
