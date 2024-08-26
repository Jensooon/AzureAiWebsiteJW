import { Component } from '@angular/core';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { appKeys } from '../app.keys.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-speech',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './speech.component.html',
  styleUrl: './speech.component.scss',
})
export class SpeechComponent {
  transcription: string = '';

  private subscriptionKey: string = appKeys.authSpeechKey; // Replace with your Azure Speech API Key
  private region: string = 'westeurope';

  startRecognition() {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      this.subscriptionKey,
      this.region
    );
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        this.transcription = result.text;
      } else {
        console.error('Speech recognition failed: ', result.errorDetails);
        this.transcription = 'Error: ' + result.errorDetails;
      }
      recognizer.close();
    });
  }
}
