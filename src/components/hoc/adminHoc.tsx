// components/hoc/withAuthorization.tsx

import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';
import { parseUser } from '@/utils';

const AdminHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {

    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      async function checkAuthorization() {
        try {
          const userData = await parseUser();
          setLoading(false);
          if (!userData) {
            router.replace('/login');
          } else if (userData.role !== 'ADMIN') {
            router.replace('/');
          }
        } catch (error) {
          console.error('Error checking authorization:', error);
        }
      }
      checkAuthorization();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props } />;
  };

  return AuthComponent;
};

export default AdminHoc;
