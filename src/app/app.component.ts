import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComputerVisionComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AzureAiWebsiteJW';
}
