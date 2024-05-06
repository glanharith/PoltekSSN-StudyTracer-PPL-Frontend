// survey-management/preview/:id
import { useRouter } from 'next/router';
import SurveyForm from '@/components/modules/FillSurveyModule';
import AdminHoc from '@/components/hoc/adminHoc';

const PreviewSurveyPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  return <SurveyForm surveyId={ surveyId as string } type='PREVIEW'/>
}

export default AdminHoc(PreviewSurveyPage);