// PieChart.tsx

import dynamic from 'next/dist/shared/lib/dynamic';
import React, { useEffect, useState } from 'react';
import { isWindowAvailable } from 'utils/navigation';
import { ChartProps, ChartState } from './LineAreaChart';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PieChart(props: ChartProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartOptions] = useState(props.chartOptions);

  if (!isWindowAvailable()) return <></>;

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type='pie'
      width='100%'
      height='70%'
    />
  );
}

export default PieChart;
