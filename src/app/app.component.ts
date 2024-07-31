import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { HttpClientModule } from '@angular/common/http';
import { ComputerVisionService } from './computer-vision.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComputerVisionComponent, HttpClientModule],
  providers: [ComputerVisionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AzureAiWebsiteJW';
}
