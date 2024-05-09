import { useCallback, useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import Modal from './components/Modal.jsx';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
console.log(storedPlaces);

function App() {
  console.log('Rendering App...');
  const selectedPlace = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    console.log('Getting user location...');
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedPickedPlaces = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    if (storedPickedPlaces.indexOf(id) === -1) {
      localStorage.setItem('pickedPlaces', JSON.stringify([id, ...storedPickedPlaces]));
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    setIsModalOpen(false);

    const storedPickedPlaces = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    localStorage.setItem(
      'pickedPlaces',
      JSON.stringify(storedPickedPlaces.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
          fallbackText="Sorting places by distance..."
        />
      </main>
    </>
  );
}

export default App;
