import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authToken?: string;
  profile?: any;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  logout() {
    this.authToken = undefined;
    this.profile = undefined;
  }

  getUser() {
    this.httpClient.get('http://localhost:3000/profile', { headers: { 'Authorization': `Bearer ${this.authToken}` } })
    .subscribe(
      (response: any) => {
        this.profile = response;
      }, (e) => {
        console.log('>>', e);

      });
  }
}
