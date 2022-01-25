import React, { useState, useContext, useEffect } from "react";
import "./AnimalForm.css";
import AnimalRepository from "../../repositories/AnimalRepository";
import EmployeeRepository from "../../repositories/EmployeeRepository";
import LocationRepository from "../../repositories/LocationRepository";
import {useHistory} from "react-router"




export default (props) => {
  const [animalName, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [animals, setAnimals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(0);
  const [saveEnabled, setEnabled] = useState(false);
  const [locations, setLocation] = useState([]);
 const [locationId, setLocationId ] = useState(0)
 const history = useHistory()

useEffect(() => {
    EmployeeRepository.getAll().then(data => setEmployees(data))
    
}, [])
useEffect(() => {
    LocationRepository.getAll().then(data => setLocation(data))
    
}, [])



  const constructNewAnimal = (evt) => {
    evt.preventDefault();
    const eId = parseInt(employeeId);
    
  
    if (eId === 0) {
      window.alert("Please select a caretaker");
    } else {
      const emp = employees.find((e) => e.id === eId);
      const animal = {
        name: animalName,
        breed: breed,
        employeeId: eId,
        locationId: parseInt(locationId)
      };

      AnimalRepository.addAnimal(animal)
        .then(() => setEnabled(true))
        .then(() => history.go(`/animals`));
    }
  };

  return (
    <form className="animalForm">
      <h2>Admit Animal to a Kennel</h2>
      <div className="form-group">
        <label htmlFor="animalName">Animal name</label>
        <input
          type="text"
          required
          autoFocus
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          id="animalName"
          placeholder="Animal name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          required
          className="form-control"
          onChange={(e) => setBreed(e.target.value)}
          id="breed"
          placeholder="Breed"
        />
      </div>
      <div className="form-group">
        <label htmlFor="employee">Make appointment with caretaker</label>
        <select
          defaultValue=""
          name="employee"
          id="employeeId"
          className="form-control"
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select an employee</option>
          {employees.map((e) => (
            <option key={e.id} id={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="location">Locations</label>
        <select
          defaultValue=""
          name="location"
          className="form-control"
          id="location"
          onChange={(e) => setLocationId(e.target.value)}
        >
          <option value="0">Select an Location</option>
          {locations.map((l) => (
            <option key={l.id} id={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        onClick={constructNewAnimal}
        
        disabled={saveEnabled}
        className="btn btn-primary"
      >
        {" "}
        Submit{" "}
      </button>
    </form>
  );
};
