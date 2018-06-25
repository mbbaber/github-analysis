import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-highpie',
  templateUrl: './highpie.component.html',
  styleUrls: ['./highpie.component.css']
})
export class HighpieComponent implements OnChanges {

  options: Object;
  @Input('data') public data: any = {};

  ngOnChanges() {
    const series = []
    for (var i=0; i < this.data.commits.length; i++) {
      series.push({
        name: this.data.contributors[i],
        y: this.data.commits[i]
      })
    }


    this.options = {
      title: { text: 'Committers in last 100 commits' },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
      series: [{
        name: 'Contributors',
        colorByPoint: true,
        data: series
      }]
    }
  }

}