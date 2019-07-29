import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeWidgetService {

  apiKey = 'AIzaSyCr2e8GYOOpmuWkLfK943UBDt1Y0Iq3CsA';
  // AIzaSyDFaHaOE0Rp6yVAjB7EWqXj2LqMspgB-ww
  url: string;
  constructor(public httpClient: HttpClient) { }

  getThumbnail(channel, maxResults): Observable<Object> {
    this.url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet&maxResults=' + maxResults;
    return this.httpClient.get(this.url)
      .pipe(map((res) => {
        return res;
      }))
  }
}
