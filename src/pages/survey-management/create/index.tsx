import { CreateSurveyModule } from '@/components';
import AdminHoc from '@/components/hoc/adminHoc';

const CreateSurveyPage = () => {
  return <CreateSurveyModule />;
};

export default AdminHoc(CreateSurveyPage);
