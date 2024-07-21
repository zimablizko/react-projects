import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>Something went wrong!</p>;
  }

  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {
    //   isError: true,
    //   message: 'Something went wrong!',
    // };
    // throw new Response(
    //   JSON.stringify({
    //     message: 'Something went wrong!',
    //   }),
    //   {
    //     status: 500,
    //   }
    // );
    return json(
      {
        message: 'Something went wrong!',
      },
      { status: 500 }
    );
  } else {
    return response;
  }
}
