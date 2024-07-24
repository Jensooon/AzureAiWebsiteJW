import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputerVisionService {
  // private endpoint = 'https://test.cognitiveservices.azure.com/';
  // private subscriptionKey = '<my_subscription_key>';
  // constructor(private http: HttpClient) {}
  // analyzeImage(imageUrl: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Ocp-Apim-Subscription-Key': this.subscriptionKey,
  //     'Content-Type': 'application/json',
  //   });
  //   const body = {
  //     url: imageUrl,
  //   };
  //   return this.http.post(
  //     `${this.endpoint}/vision/v3.1/analyze?visualFeatures=Categories,Description,Color`,
  //     body,
  //     { headers }
  //   );
  // }
}
