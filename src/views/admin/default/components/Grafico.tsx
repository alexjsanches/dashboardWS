import dynamic from 'next/dynamic';
import Card from 'components/card/Card';
import { useState, useEffect } from 'react';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw';

export function Grafico() {

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const [gynSFormat, setGynSFormat] = useState<number | null>(null);
  const metaUdi = 3129282.73;
  const metaGyn = 3824678.76; 
  

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { udiSFormat, gynSFormat } = response;
            setUdiSFormat(udiSFormat);
            setGynSFormat(gynSFormat);
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

    const intervalId = setInterval(fetchData, 180000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

const data = {
  series: [
    {
      name: 'Previsto UDI',
      data: [metaUdi],
      color: '#775DD0',
    },
    {
      name: 'Realizado UDI',
      data: [udiSFormat],
      color: '#00E396',
    }, 
    {
      name: 'Previsto GYN',
      data: [ metaGyn],
      color: '#775DD0',
    },
    {
      name: 'Realizado GYN',
      data: [gynSFormat],
      color: '#00E396'
    }, 
    
],
  options: {
    chart: {
      height: 400,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: '18px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    yaxis: {
      show: false,
    },
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
