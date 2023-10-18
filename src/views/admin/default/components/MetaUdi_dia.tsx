import dynamic from 'next/dynamic';

interface Props {
  udiSFormatHj: number;
  metaDiariaCalcUDI: number;
}

export function MetaUdi({udiSFormatHj,metaDiariaCalcUDI}: Props) {

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const data = {
    series: [
        {
          name: 'Atual',
          data: [
            {
              x: 'UDI',
              y: udiSFormatHj,
              goals: [
                {
                  name: 'Meta',
                  value: metaDiariaCalcUDI,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            }
          ]
        }
      ],
  options: {
    grid:{
        show: false,
    },
    chart: {
        height: 250,
        toolbar: {
            show: false,
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Atual', 'Meta'],
        labels: {
          colors: '#fff',
        },
        markers: {
          fillColors: ['#00E396', '#775DD0'],
        },
      },
      xaxis: {
        
        labels: {
          style:{
            colors: '#fff'
          }
        }
      },
      yaxis:{
        show: false,
      }
  },
};


  return (
    
      <Chart
        options={data.options}
        series={data.series}
        type='bar'
      />
    
  )
}
