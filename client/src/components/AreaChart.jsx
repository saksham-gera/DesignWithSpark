import React from 'react'
import Chart from 'react-apexcharts'

export default function AreaChart() {
    const data = {
        series: [{
            name: 'Previous Month',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'This Month',
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
        series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
                
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              fill: {
                colors: ["#000000","green","blue","pink","yellow"],
              },
              colors: ["red","green","blue","pink","yellow"],
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
            <Chart className="m-4" options={pieData.options} series={pieData.series} type='pie' height={350} width={450}/>
            
        </div>
    )
}
