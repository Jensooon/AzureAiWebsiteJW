import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appKeys } from '../app.keys.js';
import {
  HttpClient,
  HttpClientModule,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';

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

  readonly ROOT_URL = appKeys.endpoint;

  requests: any;
  newPost: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    let params = new HttpParams().set('visualFeatures', 'Description');
    let headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', '<key1>');

    this.requests = this.http.get(this.ROOT_URL + '/posts', {
      params,
      headers,
    });
  }

  createPost() {
    const data = new FormData();

    // Read the file from the path
    fetch('assets/Owl.jpg')
      .then((response) => response.blob())
      .then((blob) => {
        data.append('file', blob, 'image.jpg');

        let params = new HttpParams().set('visualFeatures', 'Description');
        let headers = new HttpHeaders().set(
          'Ocp-Apim-Subscription-Key',
          appKeys.authKey
        );

        this.newPost = this.http.post(this.ROOT_URL, data, { params, headers });
      })
      .catch((error) => {
        console.error('Error reading file:', error);
      });

    //We can use an rxjs observable to filter what we get back
  }

  imagePreviews: string[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.addDragOverClass();
  }

  onDragLeave(event: DragEvent) {
    this.removeDragOverClass();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.removeDragOverClass();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(files: FileList) {
    this.imagePreviews = []; // Clear previous previews
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  private addDragOverClass() {
    // Add a class to style the drag over state
  }

  private removeDragOverClass() {
    // Remove the drag over styling class
  }
}
