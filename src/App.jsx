// src/App.jsx
import { useState, useEffect } from 'react';
import * as petService from './services/petService'
import PetList from './components/PetList';
import PetDetail from './components/PetDetail'
import PetForm from './components/PetForm';


const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  // in the petList, when someone clicks on, eg., Jeff2
  // that gets added into "selected" state in the parent
  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      // Call petService.create, assign return value to newPet
      const newPet = await petService.create(formData);

      if (newPet.error) {
        throw new Error(newPet.error);
      }
      // Add the pet object and the current petList to a new array, and
      // set that array as the new petList
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
        // Log the error to the console
        console.log(error);
    }
  };

  return (
    <>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  );
};

export default App;