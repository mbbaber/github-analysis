import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';


const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'search', component: SearchPageComponent},
    {path: 'analytics/:Id', component: AnalyticsPageComponent},
    {path: 'bookmarks', component: BookmarksPageComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }