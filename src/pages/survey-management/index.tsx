import { useEffect, useState } from 'react';
import { parseUser } from '@/utils';
import AdminSurveyModule from '@/components/modules/AdminSurveyModule';
import KaprodiSurveyModule from '@/components/modules/KaprodiSurveyModule';
import AdminKaprodiHoc from '@/components/hoc/adminKaprodiHoc';

const ViewSurveyPage = () => {
  const [userRole, setUserRole] = useState<string>();

  const fetchUser = async () => {
    const user = await parseUser();
    if (user) {
        setUserRole(user.role);
      };
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const SurveyComponent = userRole === 'ADMIN' ? AdminSurveyModule : KaprodiSurveyModule;

  return <SurveyComponent />;
};

export default AdminKaprodiHoc(ViewSurveyPage);
