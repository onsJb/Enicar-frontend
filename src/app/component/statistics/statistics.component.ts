import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { StatisticsService } from '../../service/statistics.service';
import { DiplomeeService } from '../../service/diplomee.service';
import { ChartData } from '../../models/chartData.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss','./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public chartLabels: Label[] = [];
  public chartDataPublic: SingleDataSet = [];
  public chartDataPrive: SingleDataSet = [];
  public chartDataEtranger: SingleDataSet = [];
  public chartDataChomage: SingleDataSet = [];

  chart: any;
  secteurs: any = ['Public','Privé','Etranger','Chomage'];
  promos: any = ['2022','2021'];
  diplomes:any;
 

  constructor(
    private http: HttpClient,
    private diplomeeService : DiplomeeService
  ) {
    
   }

  ngOnInit(): void {      
    const chartDiplome1 = new Chart("chartDiplome1", {
      type: 'bar',
      data: {
          labels: [],
          datasets: [
            {
              label: 'Public',
              data: [],
              backgroundColor:'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1
            },

            {
              label: 'Privé',
              data: [],
              backgroundColor:'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgb(255, 159, 64)',
              borderWidth: 1
            },

            {
              label: 'Etranger',
              data: [],
              backgroundColor:'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            },
          
            {
            label: 'Chomage',
            data: [],
            backgroundColor:'rgba(153, 102, 255, 0.2)',
            borderColor:'rgb(153, 102, 255)',
            borderWidth: 1
            }]
      }
  });
  this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[0]}/${this.promos[0]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
    (d)=> {
      d.forEach((chart: ChartData) => {
        this.chartLabels.push(chart.diplome);
        this.chartDataPublic.push(chart.nbDiplomees);
      }) ;
      chartDiplome1.data.labels = this.chartLabels;
      if (chartDiplome1.data?.datasets) 
      chartDiplome1.data.datasets[0].data = this.chartDataPublic;
      chartDiplome1.update();
      this.chartDataPublic = [];
    });
   
    this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[1]}/${this.promos[0]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
      (d)=> {
        d.forEach((chart: ChartData) => {
          this.chartDataPrive.push(chart.nbDiplomees);
        });
        if (chartDiplome1.data?.datasets) 
        chartDiplome1.data.datasets[1].data = this.chartDataPrive;
        chartDiplome1.update();
        this.chartDataPrive = [];
      });

      this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[2]}/${this.promos[0]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
        (d)=> {
          d.forEach((chart: ChartData) => {
            this.chartDataEtranger.push(chart.nbDiplomees);
          }) ;
          if (chartDiplome1.data?.datasets) 
          chartDiplome1.data.datasets[2].data = this.chartDataEtranger;
          chartDiplome1.update();
          this.chartDataEtranger = [];
        });

        this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[3]}/${this.promos[0]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
          (d)=> {
            d.forEach((chart: ChartData) => {
              this.chartDataChomage.push(chart.nbDiplomees);
            }) ;
            console.log(this.chartDataPublic);
            if (chartDiplome1.data?.datasets) 
            chartDiplome1.data.datasets[3].data = this.chartDataChomage;
            chartDiplome1.update();
            this.chartDataChomage = [];
          });

          const chartDiplome2 = new Chart("chartDiplome2", {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                  {
                    label: 'Public',
                    data: [],
                    backgroundColor:'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                  },
      
                  {
                    label: 'Privé',
                    data: [],
                    backgroundColor:'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1
                  },
      
                  {
                    label: 'Etranger',
                    data: [],
                    backgroundColor:'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                  },
                
                  {
                  label: 'Chomage',
                  data: [],
                  backgroundColor:'rgba(153, 102, 255, 0.2)',
                  borderColor:'rgb(153, 102, 255)',
                  borderWidth: 1
                  }]
            }
        });

        this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[0]}/${this.promos[1]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
          (d)=> {
            d.forEach((chart: ChartData) => {
              this.chartDataPublic.push(chart.nbDiplomees);
            }) ;
            chartDiplome2.data.labels = this.chartLabels;
            if (chartDiplome2.data?.datasets) 
            chartDiplome2.data.datasets[0].data = this.chartDataPublic;
          });
         
          this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[1]}/${this.promos[1]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
            (d)=> {
              d.forEach((chart: ChartData) => {
                this.chartDataPrive.push(chart.nbDiplomees);
              });
              if (chartDiplome2.data?.datasets) 
              chartDiplome2.data.datasets[1].data = this.chartDataPrive;
            });
      
            this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[2]}/${this.promos[1]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
              (d)=> {
                d.forEach((chart: ChartData) => {
                  this.chartDataEtranger.push(chart.nbDiplomees);
                }) ;
                if (chartDiplome2.data?.datasets) 
                chartDiplome2.data.datasets[2].data = this.chartDataEtranger;
              });
      
              this.http.get<ChartData[]>(`${environment.apiUrl}/diplomee/statistics/chartDiplome/${this.secteurs[3]}/${this.promos[1]}`).pipe(map((d:Array<ChartData>)=>d)).subscribe(
                (d)=> {
                  d.forEach((chart: ChartData) => {
                    this.chartDataChomage.push(chart.nbDiplomees);
                  }) ;
                  if (chartDiplome2.data?.datasets) 
                  chartDiplome2.data.datasets[3].data = this.chartDataChomage;
                  chartDiplome2.update();
                });
        }}