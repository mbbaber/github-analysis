import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnChanges {

  options: Object;
  @Input('data') public data: any;

  ngOnChanges() {
    console.log("timeseries data", this.data)
    this.options = {
      title: { text: 'Last 100 Commits' },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'commits'
        }
      },
      legend: {
        enabled: false
      },
      chart: {
        zoomType: 'x'
      },
      series: [{
        dataGrouping: {
          approximation: "sum",
          enabled: true,
          forced: true
        },
        data: this.data
      }]
    }
  }

}