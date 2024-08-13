import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appKeys } from '../app.keys.js';
import {
  HttpClient,
  HttpClientModule,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { map } from 'rxjs';
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
  analysisResult: any;

  readonly DESCRIBE_IMG_URL = appKeys.describeImageEndpoint;
  readonly OCR_IMG_URL = appKeys.OCRImageEndpoint;
  readonly OCR_GET_URL = appKeys.OCRGetEndpoint;

  requests: any;
  describeImagePost: any;

  OCRPost: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    let params = new HttpParams().set('visualFeatures', 'Description');
    let headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', '<key1>');

    this.requests = this.http.get(this.DESCRIBE_IMG_URL + '/posts', {
      params,
      headers,
    });
  }

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
            .post(this.DESCRIBE_IMG_URL, data, {
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

  private operatorLocation = '';

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
            .post(this.OCR_IMG_URL, data, {
              headers,
              observe: 'response', // This tells HttpClient to return the full response
            })
            .subscribe(
              (response) => {
                this.operatorLocation =
                  response.headers.get('Operator-Location')!;
                console.log('Operator Location:', this.operatorLocation); //todo: remove
              },
              (error) => {
                console.error('Error in OCR request:', error);
              }
            );
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }

    this.getOCRPost();
  }

  getOCRPost() {
    let headers = new HttpHeaders().set(
      'Ocp-Apim-Subscription-Key',
      appKeys.authKey
    );

    this.requests = this.http.get(
      //I think I am getting localhost/operatorLocation
      //And that's why it is not working as intended
      this.OCR_GET_URL + '/' + this.operatorLocation,
      {
        headers,
      }
    );
  }

  @Output() imageSelected = new EventEmitter<string>(); // Output event to emit the selected image URL

  imageUrl: string | null = null; // Store the single image URL

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
      this.imageSelected.emit(this.imageUrl); // Emit the new image URL
    }
  }
  private addDragOverClass() {
    // Optional: Add a class to style the drag over state
  }

  private removeDragOverClass() {
    // Optional: Remove the drag over styling class
  }
}
