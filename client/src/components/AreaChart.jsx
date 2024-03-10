import React from 'react'
import Chart from 'react-apexcharts'

export default function AreaChart() {
    const data = {
        series: [{

            name: 'This Month',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Previous Month',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19", "2018-09-20", "2018-09-21", "2018-09-22", "2018-09-23", "2018-09-24", "2018-09-25"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        }
    }

    const pieData = {

        series: [44, 55, 13, 30,13, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
                
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E','Team F'],
              fill: {
                colors: ["#AED0F3","#A1DCD6","#AED0F3","#A1DCD6","#AED0F3","A1DCD6"],
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
    }
    return (
        <div className='flex'>
            <Chart className="m-4" options={data.options} series={data.series} type='area' height={350} width={450}/>
            
        </div>
    )
}
