import { Component } from '@angular/core';
import { ContactformComponent } from '../contactform/contactform.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactformComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
