import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, Spacer } from '@chakra-ui/react';

interface Props {
  metaUdi: number;
  metaGyn: number;
  udiSFormatGeral: number;
  gynSFormatGeral: number;
}

export function Grafico({ metaUdi, metaGyn, udiSFormatGeral, gynSFormatGeral }: Props) {
  const [dataUdi, setDataUdi] = useState<any>({ series: [], options: {} });
  const [dataGyn, setDataGyn] = useState<any>({ series: [], options: {} });

  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  useEffect(() => {
    const newDataUdi = {
      series: [
        {
          name: 'Atual',
          data: [
            {
              x: 'UDI',
              y: udiSFormatGeral,
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
            color: '#4318FF',
          },
        },
        tooltip: {
          theme: 'dark',
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
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          show: false,
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
      },
    };
    setDataUdi(newDataUdi);

    const newDataGyn = {
      series: [
        {
          name: 'Atual',
          data: [
            {
              x: 'GYN',
              y: gynSFormatGeral,
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
            color: '#4318FF',
          },
        },
        tooltip: {
          theme: 'dark',
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
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          show: false,
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
      },
    };
    setDataGyn(newDataGyn);
  }, [metaUdi, metaGyn, udiSFormatGeral, gynSFormatGeral]);

  return (
    <Flex>
      <Box p='4'>
        <Chart options={dataUdi.options} series={dataUdi.series} type="bar" width='160px' height='220px' />
      </Box>
      <Spacer />
      <Box p='4'>
        <Chart options={dataGyn.options} series={dataGyn.series} type="bar" width='160px' height='220px' />
      </Box>
    </Flex>
  );
}
