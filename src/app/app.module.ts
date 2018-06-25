import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';
import { InputFilterPipe } from './pipes/input-filter.pipe';
import { GithubService } from './github.service';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { HighpieComponent } from './highpie/highpie.component';

declare var require : any;

@NgModule({
  declarations: [
    AppComponent,
    InputFilterPipe,
    SearchPageComponent,
    AnalyticsPageComponent,
    BookmarksPageComponent,
    TimeSeriesComponent,
    HighpieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    HttpModule,
    FormsModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
