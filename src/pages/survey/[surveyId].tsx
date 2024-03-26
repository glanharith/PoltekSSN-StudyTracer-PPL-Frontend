// pages/survey.tsx
import React from 'react';
import { Survey } from '@/components/modules/FillSurveyModule/interface';
import { useRouter } from 'next/router';
import SurveyForm from '@/components/modules/FillSurveyModule';
import AlumniHoc from '@/components/hoc/alumniHoc';


const FillSurvey =  () => {
    const router = useRouter();
    const { surveyId } = router.query;

    return <SurveyForm surveyId={surveyId as string} />;
};

export default AlumniHoc(FillSurvey)