import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import { Headers, Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(public http: Http) {}

  getData() {
    console.log(`getting data from ${this.apiUrl}`)
    return this.http
      .get(this.apiUrl)
      .toPromise()
  }

  getRepositories(query: string) {
    const url = `${this.apiUrl}/search/repositories?q=${query}+in:name`;
    console.log("Getting repositories at " + url)
    return this.http
      .get(url)
      .toPromise()
  }

  getRepositoryDetails(owner: string, repo: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}`;
    console.log("Getting repository details at " + url)
    return this.http
      .get(url)
      .toPromise()
  }

  getRepositoryStats(owner: string, repo: string, stat: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}/stats/${stat}`;
    console.log("Getting repository statistics at " + url)
    return this.http
      .get(url)
      .toPromise()
  }

  getRepositoryCommits(owner: string, repo: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}/commits`;
    console.log("Getting repository commits at " + url)
    return this.http
      .get(url)
      .toPromise()
  }
}

