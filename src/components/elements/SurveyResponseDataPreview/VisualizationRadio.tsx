import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { QuestionStat, OptionStat } from './interface';

ChartJS.register(ArcElement, Tooltip, Legend);

const isOptionStat = (data: any): data is OptionStat[] => {
  return Array.isArray(data) && data.length > 0 && 'optionLabel' in data[0];
};

const VisualizationRadio: React.FC<{ question: QuestionStat }> = ({ question }) => {
  const validData = isOptionStat(question.data) ? question.data : [];

  const data = {
    labels: validData.map(option => option.optionLabel),
    datasets: [{
      label: 'Jawaban',
      data: validData.map(option => option.optionAnswersCount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#FFCD56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#FFCD56']
    }]
  };

  return (
    <div style={{ maxWidth: '80%', maxHeight: '400px', margin: 'auto' }}>
    <Pie data={data} />
  </div>);
};

export default VisualizationRadio;
