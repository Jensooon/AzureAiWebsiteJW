import { Component } from '@angular/core';
import {
  AzureKeyCredential,
  TextAnalyticsClient,
  DetectLanguageSuccessResult,
  ExtractKeyPhrasesResult,
} from '@azure/ai-text-analytics';
import { appKeys } from '../app.keys.js';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  value = '';
  textToAnalyze = '';
  detectedLanguage = '';

  public keyPhrases: string[] = [];

  private client: TextAnalyticsClient;

  constructor() {
    const endpoint = appKeys.TextEndpoint;
    const apiKey = appKeys.authTextKey;
    //responsible for making requests to the Text Analytics service
    this.client = new TextAnalyticsClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );
  }

  //Update textToAnalyze when a change occurs in the textarea
  onTextChange(event: Event) {
    this.textToAnalyze = (event.target as HTMLTextAreaElement).value;
  }

  async detectLanguage() {
    try {
      //Calls the detectLanguage method of the Text Analytics client
      const [result] = await this.client.detectLanguage([this.textToAnalyze]);

      if (this.isSuccessResult(result)) {
        //Combines the name and ISO 639-1 name of the detected language
        this.detectedLanguage = `${result.primaryLanguage.name} (${result.primaryLanguage.iso6391Name})`;
      } else {
        this.detectedLanguage = `Error: ${result.error.message}`;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.detectedLanguage = `An error occurred: ${error.message}`;
      } else {
        this.detectedLanguage = 'An unknown error occurred';
      }
    }
  }

  //Check if the result is a success result
  private isSuccessResult(result: any): result is DetectLanguageSuccessResult {
    return 'primaryLanguage' in result;
  }

  async extractKeyPhrases() {
    try {
      const results = await this.client.extractKeyPhrases([this.textToAnalyze]);
      const result = results[0];

      if ('error' in result) {
        console.error('Error:', result.error);
      } else if ('keyPhrases' in result) {
        this.keyPhrases = result.keyPhrases;
      } else {
        console.error('Unexpected result structure');
      }
    } catch (error) {
      console.error('Error extracting key phrases:', error);
    }
  }
}
