import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

interface Props {
  percMargem: { [codVend: string]: number } | null;
}

export function Margem({ percMargem }: Props) {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  if (!percMargem || typeof percMargem !== 'object') {
    // Pode retornar uma mensagem ou um componente alternativo indicando que não há dados
    return <p>Sem dados disponíveis.</p>;
  }

  const dataArray = Object.entries(percMargem).map(([codVend, margemContrib]) => ({
    codVend,
    margemContrib,
    meta: 20, // Substitua 50 pelo valor real da sua meta
  }));

  const series = [
    {
      name: 'Margem Contribuição',
      data: dataArray.map((item) => ({
        x: item.codVend,
        y: item.margemContrib,
        goals: [
          {
            name: 'Meta',
            value: item.meta,
            strokeWidth: 30,
            strokeHeight: 10,
            strokeColor: '#feff79',
          },
        ],
      })),
    },
  ];

  const options: ApexOptions = {
    grid: {
      show: false,
    },
    chart: {
      height: 250,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: dataArray.map((item) =>
      item.margemContrib >= item.meta ? '#2b66d6' : '#f34144'
    ),
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: function (val: number) {
        return `${val} %`;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Na meta', 'Abaixo da meta', 'Referência'],
      labels: {
        colors: '#000',
      },
      markers: {
        fillColors: ['#2b66d6','#f34144', '#feff79'],
      },
    },
    xaxis: {
      categories: dataArray.map((item) => `${item.codVend}: ${item.margemContrib} %`),
      labels: {
        style: {
          colors: '#000',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <Chart options={options} series={series} type="bar" width="500%" height="480%" />
  );
}
