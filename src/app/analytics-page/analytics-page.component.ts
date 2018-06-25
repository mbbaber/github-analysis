import { Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';
import { GithubService } from '../github.service';
import { Bookmark } from '../bookmarks';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnChanges {

  @Input('owner') public owner: string;
  @Input('repo') public repo: string;

  @Output() bookmarkEvent = new EventEmitter<string>();

  repositoryDetails: any;
  repositoryContributors: any = [];
  repositoryCommits: any;
  commits: any = {};
  timeSeriesData = [];


  constructor(public github: GithubService) { }

  ngOnChanges() {

    this.getRepositoryDetails()
    this.getRepositoryContributors()
    this.getRepositoryCommits()

  }
  getRepositoryDetails() {
    this.github.getRepositoryDetails(this.owner, this.repo)
    .then((res) => {
      this.repositoryDetails = res.json()
    })
    .catch((err) => console.log(err))
  }


  getRepositoryContributors() {
    this.github.getRepositoryStats(this.owner, this.repo, "contributors")
      .then((res) => {
        this.repositoryContributors = res.json()
      })
      .catch((err) => console.log(err))
  }

  addBookmark(repo: string) {
    this.bookmarkEvent.emit(repo);
  }

  getRepositoryCommits() {
    this.github.getRepositoryCommits(this.owner, this.repo)
    .then((res) => {
      this.repositoryCommits = res.json().slice(0,100)

      this.groupByCommiter(this.repositoryCommits);

      this.timeSeriesData = this.repositoryCommits.map((commit) => {
        return [ (new Date(commit.commit.committer.date)).valueOf(), 1 ]
      }).reverse();
    })
    .catch((err) => console.log(err))
  }

  groupByCommiter(lastCommits){

    //Reset graph
    this.commits = {};

    var contributors = [];
    var commits = [];

    var groups = {}

    lastCommits
      .map(c => c.commit.author.name)
      .forEach(user => {
        if (groups[user]){
          groups[user] = groups[user] + 1;
        } else {
          groups[user] = 1
        }
      });

    var userCommits = [];
    for( var u in groups) {
      userCommits.push([u, groups[u]])
    }

    // sort by higher number of commits
    userCommits = userCommits.sort((a: number, b: number) => {
      if (a[1] < b[1]) {
        return 1
      } else {
        return -1
      }
    })

    userCommits.slice(0,5).forEach((userContribution) => {
      contributors.push(userContribution[0]);
      commits.push(userContribution[1]);
    })

    if(userCommits.length > 5) {
      const sum = userCommits.slice(5)
        .reduce((acc, userContributions) => {
          return acc + userContributions[1];
        })

      contributors.push("Others")
      commits.push(sum)
    }

    this.commits = {commits: commits, contributors: contributors};
  }

}
