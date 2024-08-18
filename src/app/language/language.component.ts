import { Component } from '@angular/core';
import {
  AzureKeyCredential,
  TextAnalyticsClient,
  DetectLanguageSuccessResult,
} from '@azure/ai-text-analytics';
import { appKeys } from '../app.keys.js';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  textToAnalyze = '';
  detectedLanguage = '';

  private client: TextAnalyticsClient;

  constructor() {
    const endpoint = appKeys.TextEndpoint;
    const apiKey = appKeys.authTextKey;
    this.client = new TextAnalyticsClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );
  }

  onTextChange(event: Event) {
    this.textToAnalyze = (event.target as HTMLTextAreaElement).value;
  }

  async detectLanguage() {
    try {
      const [result] = await this.client.detectLanguage([this.textToAnalyze]);

      if (this.isSuccessResult(result)) {
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

  private isSuccessResult(result: any): result is DetectLanguageSuccessResult {
    return 'primaryLanguage' in result;
  }
}
