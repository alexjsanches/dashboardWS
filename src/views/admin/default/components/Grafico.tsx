import dynamic from 'next/dynamic';
import Card from 'components/card/Card';
import { useState, useEffect } from 'react';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw';
import { Box, Flex, Spacer } from '@chakra-ui/react';

interface Props {
  metaUdi: number;
  metaGyn: number;
}

export function Grafico({ metaUdi, metaGyn }: Props) {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const [gynSFormat, setGynSFormat] = useState<number | null>(null);

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
  }, []);

  const dataUdi = {
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
                strokeColor: '#775DD0',
              },
            ],
          },
        ],
      },
    ],
    options: {
      grid: {
        show: false,
      },
      chart: {
        height: 250,
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF",
        },
      },
      tooltip: {
        theme: "dark",
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false,
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
      yaxis: {
        show: false,
        labels: {
          style:{
            colors: '#fff'
          }
        }
      },
    },
  };

  const dataGyn = {
    series: [
      {
        name: 'Atual',
        data: [
          {
            x: 'GYN',
            y: gynSFormat,
            goals: [
              {
                name: 'Meta',
                value: metaGyn,
                strokeHeight: 5,
                strokeColor: '#775DD0',
              },
            ],
          },
        ],
      },
    ],
    options: {
      grid: {
        show: false,
      },
      chart: {
        height: 250,
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF",
        },
        
      },
      tooltip: {
        theme: "dark",
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false,
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
      
      yaxis: {
        show: false,
        labels: {
          style:{
            colors: '#fff'
          }
        }
      },
    },
  };

  return (
    <Flex>
      <Box p='4' >
      <Chart options={dataUdi.options} series={dataUdi.series} type="bar"  width='160px' height='220px'/>
      </Box>
      <Spacer />
      <Box p='4' >
      <Chart options={dataGyn.options} series={dataGyn.series} type="bar"  width='160px' height='220px'/>
      </Box>
    </Flex>
  );
}
