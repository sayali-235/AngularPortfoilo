import { Component } from '@angular/core';
import { ProfileImageComponent } from "../../shared/profile-image/profile-image.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [ProfileImageComponent,RouterModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {

}
