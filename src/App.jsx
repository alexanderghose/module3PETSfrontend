// src/App.jsx
import { useState, useEffect } from 'react';
import * as petService from './services/petService'
import PetList from './components/PetList';


const App = () => {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        // Don't forget the pass the error object to the new Error
        if (pets.error) {
          throw new Error(pets.error);
        }
        setPetList(pets);
      } catch (error) {
        // Log the error object
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  return <PetList petList={petList} />;
};

export default App;