import React from 'react';
import AlumniSurveyModule from '@/components/modules/AlumniSurveyModule';
import AlumniHoc from '@/components/hoc/alumniHoc';

const AlumniSurveyKurikulum = () => {
  return (
    <AlumniSurveyModule surveyType="CURRICULUM" />
  );
};

export default AlumniHoc(AlumniSurveyKurikulum);
