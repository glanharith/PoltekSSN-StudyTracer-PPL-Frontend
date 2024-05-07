import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { QuestionStat, OptionStat } from './interface';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const isOptionStat = (data: any): data is OptionStat[] => {
  return Array.isArray(data) && data.length > 0 && 'optionLabel' in data[0];
};

const VisualizationRange: React.FC<{ question: QuestionStat }> = ({ question }) => {
  const validData = isOptionStat(question.data) ? question.data : [];

  const maxOptionAnswersTickTemp = Math.max(...validData.map(option => option.optionAnswersCount));
  const maxOptionAnswersTick = Math.ceil(maxOptionAnswersTickTemp / 5) * 5;

  const data = {
    labels: validData.map(option => option.optionLabel),
    datasets: [{
      label: 'Range Count',
      data: validData.map(option => option.optionAnswersCount),
      backgroundColor: 'rgba(5, 32, 137, 0.85)',
      borderColor: 'rgba(26, 54, 93, 0.8)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        max: maxOptionAnswersTick
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default VisualizationRange;