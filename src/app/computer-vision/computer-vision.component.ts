import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appKeys } from '../app.keys.js';
import { ComputerVisionService } from '../computer-vision.service.js';
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
  newPost: any;

  constructor(private computerVisionService: ComputerVisionService) {}

  ngOnInit() {
    this.getDescribeImagePost();
  }

  getDescribeImagePost() {
    this.computerVisionService.imagePath = this.imagePreviews[0];
    this.computerVisionService.createDescriptionPost().subscribe((data) => {
      this.newPost = data;
    });
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
        console.log('Error reading file:', reader.readAsDataURL(file));
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
