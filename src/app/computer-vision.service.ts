import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { appKeys } from './app.keys';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputerVisionService {
  analysisResult: any;

  readonly ROOT_URL = appKeys.endpoint;

  requests: any;
  newPost: any;

  imagePath?: string;

  constructor(private http: HttpClient) {}

  getPosts() {
    let params = new HttpParams().set('visualFeatures', 'Description');
    let headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', '<key1>');

    this.requests = this.http.get(this.ROOT_URL + '/posts', {
      params,
      headers,
    });
  }

  createDescriptionPost(): Observable<any> {
    const data = new FormData();

    if (this.imagePath) {
      // Read the file from the path
      fetch(this.imagePath)
        .then((response) => response.blob())
        .then((blob) => {
          data.append('file', blob, 'image.jpg');

          let params = new HttpParams().set('visualFeatures', 'Description');
          let headers = new HttpHeaders().set(
            'Ocp-Apim-Subscription-Key',
            appKeys.authKey
          );

          return (this.newPost = this.http.post(this.ROOT_URL, data, {
            params,
            headers,
          }));
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });

      //We can use an rxjs observable to filter what we get back
    }
    return of(null);
  }
}
