import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occured';
  let message = 'Sorry, an error occured. Please try again later.';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found';
    message = 'The requested resource could not be found.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
