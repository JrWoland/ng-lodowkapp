import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private nextPageToken = '';

  apiKey = 'AIzaSyCr2e8GYOOpmuWkLfK943UBDt1Y0Iq3CsA';
  // AIzaSyDFaHaOE0Rp6yVAjB7EWqXj2LqMspgB-ww

  constructor(private httpClient: HttpClient) { }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams().set('part', 'snippet')
      .set('maxResults', '6')
      .set('playlistId', 'UUJFp8uSYCjXOMnkUyb3CQ3Q')
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken)
      .set('order', 'date')

    return this.httpClient.get(url, { params })
      .pipe(map((data: any) => {
        this.nextPageToken = data.nextPageToken;

        const videos: any[] = [];
        for (const video of data.items) {
          const snippet = video.snippet;
          videos.push(snippet);
        }
        return videos;
      }));


  }
}
