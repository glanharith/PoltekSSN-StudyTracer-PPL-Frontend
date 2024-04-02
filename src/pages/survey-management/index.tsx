import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseUser } from '@/utils';
import { ParsedUser } from '@/utils/parseUser/interface';
import AdminSurveyModule from '@/components/modules/AdminSurveyModule';
import KaprodiSurveyModule from '@/components/modules/KaprodiSurveyModule';

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

  return userRole === 'ADMIN' ? (
    <AdminSurveyModule />
  ) : (
    <KaprodiSurveyModule />
  );
};

export default ViewSurveyPage;
