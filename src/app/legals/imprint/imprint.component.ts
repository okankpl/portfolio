import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

}
