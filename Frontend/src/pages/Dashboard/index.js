import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import './styles.css'
import { Link } from 'react-router-dom';



export default function Dashboaard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSposts() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });
      setSpots(response.data);
      console.log(response.data);

    }
    //arary vazio uma vez apenas
    loadSposts();
  }, []);
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo SPOT</button>
      </Link>

    </>
  );
}
