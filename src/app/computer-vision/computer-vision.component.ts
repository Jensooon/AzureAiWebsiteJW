import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appKeys } from '../app.keys.js';
import {
  HttpClient,
  HttpClientModule,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { map, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-computer-vision',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule],
  templateUrl: './computer-vision.component.html',
  styleUrl: './computer-vision.component.scss',
})
export class ComputerVisionComponent {
  title = 'azure-computer-vision';
  readonly VISION_ENDPOINT = appKeys.VisionEndpoint;

  describeImagePost: any;
  OCRPost: any;
  OCRGet: any;

  imageUrl: string | null = null; // Store the single image URL

  constructor(private http: HttpClient) {}

  //Creates a POST request to the Azure Computer Vision API to describe the image
  createDescribeImagePost() {
    const data = new FormData();

    if (this.imageUrl) {
      // Read the file from the path
      fetch(this.imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          data.append('file', blob, 'image.jpg');

          let params = new HttpParams().set('visualFeatures', 'Description');
          let headers = new HttpHeaders().set(
            'Ocp-Apim-Subscription-Key',
            appKeys.authKey
          );

          this.describeImagePost = this.http
            .post(this.VISION_ENDPOINT + 'analyze', data, {
              params,
              headers,
            })
            .pipe(
              map((response: any) => response.description.captions[0].text)
            );
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }

  private operationLocation = '';

  //Creates a POST request to the Azure Computer Vision API to read the text in the image
  createOCRPost() {
    const data = new FormData();

    if (this.imageUrl) {
      fetch(this.imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          data.append('file', blob, 'image.jpg');

          let headers = new HttpHeaders().set(
            'Ocp-Apim-Subscription-Key',
            appKeys.authKey
          );

          this.OCRPost = this.http
            .post(this.VISION_ENDPOINT + 'read/analyze', data, {
              headers,
              observe: 'response', // This tells HttpClient to return the full response
            })
            .pipe(take(1))
            .subscribe((response) => {
              this.operationLocation =
                response.headers.get('Operation-Location')!;
              console.log('Operation Location:', this.operationLocation);
            });
        });
    }
    this.getOCRPost();
  }

  //Creates a GET request to the Azure Computer Vision API to get the text from the image
  getOCRPost() {
    let headers = new HttpHeaders().set(
      'Ocp-Apim-Subscription-Key',
      appKeys.authKey
    );

    this.OCRGet = this.http
      .get(this.operationLocation, {
        headers,
      })
      .pipe(map((response) => this.extractTextFromResponse(response)));
  }

  private extractTextFromResponse(response: any): string[] {
    const textArray: string[] = [];

    if (response.analyzeResult && response.analyzeResult.readResults) {
      for (const readResult of response.analyzeResult.readResults) {
        for (const line of readResult.lines) {
          textArray.push(line.text);
        }
      }
    }
    return textArray;
  }

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
      this.handleFile(files[0]); // Handle the first file only
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]); // Handle the first file only
    }
  }

  private handleFile(file: File) {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl); // Revoke the previous URL
    }

    if (file.type.startsWith('image/')) {
      this.imageUrl = URL.createObjectURL(file); // Create a new URL for the new file
    }

    // Reset the results
    this.describeImagePost = '';
    this.OCRGet = '';
  }
  private addDragOverClass() {
    // Optional: Add a class to style the drag over state
  }

  private removeDragOverClass() {
    // Optional: Remove the drag over styling class
  }
}
