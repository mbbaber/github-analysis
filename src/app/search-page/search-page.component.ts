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
      })
  }

  searchRepositories() {
    this.gitHub.getRepositories(this.searchQuery)
    .then((res) => {
      this.repositories = res.json();
    })
  }

  sendMessage(owner, repo) {
    const message = `${owner.login}/${repo}`
    this.messageEvent.emit(message)
  }

  
}
