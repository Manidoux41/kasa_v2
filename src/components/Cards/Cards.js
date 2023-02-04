import React from "react";
import Card from "./Card";
//import data from '../../datas/appartement.json';
import { useState, useEffect } from "react";

// const Cards = () => {

// const [apparts, setApparts] = useState([])

// useEffect(() => {
//   setApparts(data)
// }, [apparts])

//   return (
//     <div className='cards'>
//         {apparts.map((appart) => (
//         <Card key={appart.id} appart={appart} />
//       ))}
//     </div>
//   )
// }

const Cards = () => {
  const [apparts, setApparts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/appartement.json");
        const jsonData = await response.json();
        setApparts(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    setTimeout(fetchData, 3000);

    return () => {};
  }, [apparts]);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return !isLoading ? (
    <div className="cards">
      {apparts.map((appart) => (
        <Card key={appart.id} appart={appart} />
      ))}
    </div>
  ) : (
    <div className="cards">
      <p>Chargement des données en cours ...</p>
    </div>
  );
};

export default Cards;
