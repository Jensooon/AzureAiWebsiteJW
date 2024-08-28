import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { appKeys } from '../app.keys';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss',
})
export class TranslateComponent {
  title = 'azure-computer-vision';
  readonly TRANSLATE_ENDPOINT = appKeys.TranslateEndpoint;

  translatePost: any;

  imageUrl: string | null = null; // Store the single image URL

  currentLangCode: string = 'en'; // Store the current language code

  value = '';
  textToAnalyze = '';
  constructor(private http: HttpClient) {}

  //Creates a POST request to the Azure Computer Vision API to describe the image
  createTranslatePost() {
    const data = {
      Text: this.textToAnalyze,
    };

    let params = new HttpParams().set('to', this.currentLangCode);
    let headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': appKeys.authTranslateKey,
      'Ocp-Apim-Subscription-Region': appKeys.TranslateRegion,
      'Content-Type': 'application/json',
    });

    this.translatePost = this.http.post(this.TRANSLATE_ENDPOINT, data, {
      params,
      headers,
    });
  }

  //Update textToAnalyze when a change occurs in the textarea
  onTextChange(event: Event) {
    this.textToAnalyze = (event.target as HTMLTextAreaElement).value;
  }
}
