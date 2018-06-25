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
  contributors = [];
  commits = [];
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
      console.log(this.repositoryDetails)
    })
    .catch((err) => console.log(err))
  }


  getRepositoryContributors() {
    this.github.getRepositoryStats(this.owner, this.repo, "contributors")
      .then((res) => {
        this.repositoryContributors = res.json()

        // var contributors = [];
        // var commits = [];

        // const n = this.repositoryContributors.length
        // if (n && n > 1) {

        //   var sum = 0;

        //   for (var i = n - 1; i >= Math.max(0, n - 5); i--) {
        //     contributors.push(this.repositoryContributors[i].author.login)
        //     commits.push(this.repositoryContributors[i].total)
        //   }

        //   if(n > 5){
        //     for (var i = n - 6; i >= 0; i--) {
        //       sum = sum + (this.repositoryContributors[i].total)
        //     }
        //     contributors.push('Others')
        //     commits.push(sum)
        //   }

        // } else { //need to take care of case with only one committer
        //   contributors.push(this.repositoryContributors.author.login)
        //   commits.push(this.repositoryContributors.total)
        // }

        // this.contributors = contributors
        // this.commits = commits
        // console.log(this.contributors, this.commits)
       
        // console.log("contributors",this.repositoryContributors)
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
    console.log(lastCommits)

    var contributors = [];
    var commits = [];

    var groups = {}

    lastCommits
      .map(c => c.author.login)
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

      /**
       * var sum=0;
       * for (var i=5; i < userCommits.length; i++){
       *   sum = sum + userCommits[i][1]
       * } 
       */

      contributors.push("Others")
      commits.push(sum)
    }

    this.contributors = contributors;
    this.commits = commits;

    console.log(this.contributors);
    console.log(this.commits)
  }

}