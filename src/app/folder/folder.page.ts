import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dynamicControlModel, Page } from '../Model/dynamicControlModel';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public dynamicData !: dynamicControlModel;
  public PageData : Page | undefined;
  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http
      .get('/assets/myJson.json')
      .subscribe((dynamicControl: any) => {
        this.dynamicData = dynamicControl;
        this.PageData = this.dynamicData.pages.find(s => s.pageid == this.folder);
      });

  }

}
