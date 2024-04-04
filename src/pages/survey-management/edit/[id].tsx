import { EditSurveyModule } from '@/components';
import AdminHoc from '@/components/hoc/adminHoc';
import { useRouter } from 'next/router';

const EditSurveyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EditSurveyModule id={id} />;
};

export default AdminHoc(EditSurveyPage);
