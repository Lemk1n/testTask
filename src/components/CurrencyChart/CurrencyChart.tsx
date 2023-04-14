import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import styles from './CurrencyChart.module.scss';

interface DataItem {
  priceUsd: string;
  time: number;
};

interface ICurrencyChart {
  history: {    
    data: DataItem[];
    timestamp: number;
  };
};

const CurrencyChart: React.FC<ICurrencyChart> = ({ history }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (history && chartRef.current && history.data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) {
        return;
      }

      const chartData = {
        labels: history.data.map((item) => item.time),
        datasets: [
          {
            label: 'Price',
            data: history.data.map((item) => item.priceUsd),
            backgroundColor: 'rgba(0, 119, 204, 0.1)',
            borderColor: 'rgba(0, 119, 204, 1)',
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
        
      };

      const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              ticks: {
                callback: (value: string) => `$${parseFloat(value).toFixed(2)}`,
              },
            },
          },
        },
      });
      return () => {
        myChart.destroy()
      }
    }    
  }, [history]);

  if(!history){
    return null;
  }

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CurrencyChart;
