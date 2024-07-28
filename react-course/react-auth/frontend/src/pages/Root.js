import { Outlet, useNavigation, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData('root');
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const expirationTime = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, expirationTime);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
