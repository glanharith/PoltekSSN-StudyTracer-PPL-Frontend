// survey-management/preview/:id/response
import { useRouter } from 'next/router';
import AdminKaprodiHoc from '@/components/hoc/adminKaprodiHoc';
import { parseUser } from '@/utils';
import { useState, useEffect } from 'react';
import ResponseModule from '@/components/modules/ResponseModule';

const SurveyResponsePage = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  const [userRole, setUserRole] = useState<'ADMIN' | 'KAPRODI'>('ADMIN');

  const fetchUser = async () => {
    const user = await parseUser();
    if (user) {
      if (user.role === 'ADMIN') {
        setUserRole('ADMIN');
      } else {
        setUserRole('KAPRODI');
      }
    }
  };

  useEffect(() => {
    console.log('Survey ID:', surveyId);
    fetchUser();
  }, []);

  if (!surveyId) {
    return <div>Loading...</div>;
  }

  return <ResponseModule surveyId={surveyId as string} role={userRole} />;
};

export default AdminKaprodiHoc(SurveyResponsePage);
