import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { dynamicControlModel, menubar } from './Model/dynamicControlModel';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: menubar[] = [];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private http: HttpClient) { }
  // <ion-icon name="document-outline"></ion-icon>
  ngOnInit() {
    this.http
      .get('/assets/myJson.json')
      .subscribe((dynamicControlPage: any) => {
        var page: dynamicControlModel = dynamicControlPage;
        page.pages.forEach(element => {
          var data = { title: element.pageid, url: '/folder/' + element.pageid, icon: 'document' };
          this.appPages.push(data);
        });
      });
  }
}
