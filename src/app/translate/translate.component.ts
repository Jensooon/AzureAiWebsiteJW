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
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
    AsyncPipe,
    JsonPipe,
    NgFor,
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

  selectedLanguage: string; // Store the selected language
  languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Korean',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
  ];

  // Mapping of language names to language codes
  languageCodeMap: { [key: string]: string } = {
    English: 'en',
    Spanish: 'es',
    French: 'fr',
    German: 'de',
    Italian: 'it',
    Japanese: 'ja',
    Korean: 'ko',
    'Chinese (Simplified)': 'zh-Hans',
    'Chinese (Traditional)': 'zh-Hant',
  };

  value = '';
  textToAnalyze = '';
  constructor(private http: HttpClient) {
    this.selectedLanguage = this.languages[0]; //Default to English
  }

  //Creates a POST request to the Azure Computer Vision API to describe the image
  createTranslatePost() {
    const data = [
      {
        Text: this.textToAnalyze,
      },
    ];

    let params = new HttpParams().set('to', this.getLanguageCode());
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

  // Method to get the language code based on the selected language
  getLanguageCode(): string {
    return this.languageCodeMap[this.selectedLanguage] || 'en'; // Default to 'en' if not found
  }
}
