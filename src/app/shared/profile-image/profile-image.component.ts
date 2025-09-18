import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.css'
})
export class ProfileImageComponent {
 @Input() imagePath: string = 'assets/images/sayali.jpg';
  @Input() altText: string = 'Sayali Divekar';
}
