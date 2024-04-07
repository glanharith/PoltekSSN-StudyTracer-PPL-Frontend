import React from 'react';
import AlumniSurveyModule from '@/components/modules/AlumniSurveyModule';
import AlumniHoc from '@/components/hoc/alumniHoc';

const AlumniSurveyKarir = () => {
  return (
    <AlumniSurveyModule surveyType="CAREER" />
  );
};

export default AlumniHoc(AlumniSurveyKarir);
