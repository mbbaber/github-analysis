import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { GithubService } from '../github.service';
import { Bookmark } from '../bookmarks';


@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnChanges {

  @Input('bookmarkList') public bookmarkList: Array<Bookmark>;
  @Output() messageEvent = new EventEmitter<string>();
  
  bookmarkedInfo: any;

  constructor(public github: GithubService) { }

  ngOnChanges() {
    
  }

  sendMessage(repo: string) {
    this.messageEvent.emit(repo)
  }

}
