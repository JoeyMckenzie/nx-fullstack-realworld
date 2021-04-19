import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nx-fullstack-realworld/api-interfaces';

@Component({
  selector: 'nx-fullstack-realworld-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
