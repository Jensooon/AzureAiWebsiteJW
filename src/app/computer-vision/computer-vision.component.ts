import { Component } from '@angular/core';
import { ComputerVisionService } from '../computer-vision.service.js';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-computer-vision',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './computer-vision.component.html',
  styleUrl: './computer-vision.component.scss',
})
export class ComputerVisionComponent {
  title = 'azure-computer-vision';
  analysisResult: any;

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/';

  posts: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + '/posts');
  }

  // analyzeImage() {
  //   const imageUrl = '/assets/Owl.jpg'; // Replace with the actual image URL
  //   this.computerVisionService.analyzeImage(imageUrl).subscribe(
  //     (data) => {
  //       this.analysisResult = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Error analyzing image:', error);
  //     }
  //   );
  // }
}
