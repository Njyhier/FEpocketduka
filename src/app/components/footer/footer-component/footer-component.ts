import { Component } from '@angular/core';
import { LogoComponent } from "../../logo/logo-component/logo-component";

@Component({
  selector: 'app-footer-component',
  standalone:true,
  imports: [LogoComponent],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {

}
