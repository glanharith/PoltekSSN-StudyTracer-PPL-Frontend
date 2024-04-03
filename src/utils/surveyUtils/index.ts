import { Survey } from '@/components/elements/SurveyCard/interface';

export const filterSurveys = (
  surveys: Survey[],
  type: string,
  filterFn: any,
) => {
  if (!Array.isArray(surveys)) {
    return [];
  }
  return surveys.filter(
    (survey) =>
      survey.type === type &&
      filterFn(new Date(survey.startTime), new Date(survey.endTime)),
  );
};

export const isUpcoming = (startTime: Date, endTime: Date) => {
  return startTime > new Date();
};

export const isOngoing = (startTime: Date, endTime: Date) => {
  const today = new Date();
  return startTime <= today && endTime > today;
};

export const isArchived = (startTime: Date, endTime: Date) => {
  return endTime <= new Date();
};

export const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};
