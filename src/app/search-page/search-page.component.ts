import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  repositories = [];
  data: any;
  searchQuery: string = '';
  currentOwner: string = '';
  currentRepo: string = '';
  // currentStat: string = '';

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    public gitHub: GithubService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.gitHub.getData()
      .then((res) => {
        this.data = res.json();
        console.log(this.data)
      })
  }

  searchRepositories() {
    this.gitHub.getRepositories(this.searchQuery)
    .then((res) => {
      this.repositories = res.json();
      console.log(this.repositories)
    })
  }

  sendMessage(owner, repo) {
    const message = `${owner.login}/${repo}`
    // /repo/${stat}`
    this.messageEvent.emit(message)
    console.log(message);
  }

  
}
