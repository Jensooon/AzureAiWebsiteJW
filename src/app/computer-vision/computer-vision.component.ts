import { Component } from '@angular/core';
import { ComputerVisionService } from '../computer-vision.service.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-computer-vision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computer-vision.component.html',
  styleUrl: './computer-vision.component.scss',
})
export class ComputerVisionComponent {
  title = 'azure-computer-vision';
  analysisResult: any;

  constructor(private computerVisionService: ComputerVisionService) {}

  analyzeImage() {
    const imageUrl = '/assets/Owl.jpg'; // Replace with the actual image URL
    this.computerVisionService.analyzeImage(imageUrl).subscribe(
      (data) => {
        this.analysisResult = data;
        console.log(data);
      },
      (error) => {
        console.error('Error analyzing image:', error);
      }
    );
  }
}
