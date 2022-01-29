import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  username = 'john';
  password = '123123123';
  authToken?: string;
  profile?: any;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  submit() {
    this.httpClient.post(
      'http://localhost:3000/auth/login',
      { username: this.username, password: this.password },
    ).pipe(
      tap((response: any) => {
        if ('access_token' in response) {
          this.authToken = response.access_token;
          return;
        }
      }),
      mergeMap(() => {
        return this.httpClient.get('http://localhost:3000/profile', { headers: { 'Authorization': `Bearer ${this.authToken}` } });
      }),
    ).subscribe(
      (response: any) => {
        this.profile = response;
      }, (e) => {
        console.log('>>', e);

      });
  }

  logout() {
    this.authToken = undefined;
  }
}
