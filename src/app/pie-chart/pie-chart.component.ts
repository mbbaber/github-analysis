import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Input('data') public pieChartData: number[];
  public pieChartType: string = 'doughnut';
  @Input('labels') public pieChartLabels: string[];

  public pieChartOptions: any = {
    cutoutPercentage: 0,
    legend: {
      display: true
    }
    // responsive: true
  };

  // events
  public chartClicked(e: any): void {

    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}