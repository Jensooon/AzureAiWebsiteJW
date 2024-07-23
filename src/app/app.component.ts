import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComputerVisionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AzureAiWebsiteJW';
}
