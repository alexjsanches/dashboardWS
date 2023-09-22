import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { fetchAndFormatData, getToken } from 'api/requests/Und_FaturDiario';

export function MetaUdi() {

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const metaUdi = 156464.14;
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { udiSFormat } = response;
            setUdiSFormat(udiSFormat);
          } else {
            console.error('Erro ao formatar os dados.');
          }
        } else {
          console.error('Não foi possível obter o token.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }

    fetchData();

    
  }, []);

const data = {
    series: [
        {
          name: 'Atual',
          data: [
            {
              x: 'UDI',
              y: udiSFormat,
              goals: [
                {
                  name: 'Meta',
                  value: metaUdi,
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
        markers: {
          fillColors: ['#00E396', '#775DD0']
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
