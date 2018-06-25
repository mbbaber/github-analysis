import { Component, ViewChild } from '@angular/core';
import { SearchPageComponent } from './search-page/search-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { Bookmark } from './bookmarks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';

  // @ViewChild(SearchPageComponent) searchComponent;
  // @ViewChild(AnalyticsPageComponent) analyticsComponent;

  bookmarkList: Array<Bookmark> = [];

  constructor() { }

  owner: string = '';
  repo: string = '';

  receiveMessage($event) {
    this.owner = $event.split("/")[0]
    this.repo = $event.split("/")[1]
  }

  receiveBookmark($event) {
    this.bookmarkList.push(new Bookmark($event))
    console.log("A new bookmark has been submited to bookmarkList array");
    console.log(this.bookmarkList);
  }
}
