import { Component } from '@angular/core';
import { ProfileImageComponent } from "../../shared/profile-image/profile-image.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
