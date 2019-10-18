import React, { useState } from "react";
import api from '../../services/Api';

export default function Login({history}) {
  const [email, setEmail] = useState("");
  //vou colocar no estado o valor do email
  //geralmente um input comeca com vazio ou em branco
  //colchetoes pois usestate retorna vetor
  //com duas posicoes por isso um vetor pois quero aplicar
  //deestruturacao dois valroe que a funcao retornta
  //vai me reotnrr email e uma funcao chamava
  //set email

  //outro modo de fazer a mesma coisa do onchange.
  function HandleEmailChange(event) {
    // console.log(event.target.value)
    setEmail(event.target.value);
  }

  async function HandleSubmit(e) {
    //36:20 previne o disparo do evento.
    e.preventDefault();

    const response = await api.post("/sessions/", { email: email });
    //console.log(response.data);

    const { _id } = response.data;
    //console.log(_id);
    localStorage.setItem("user", _id);
    localStorage.setItem("json", response.data.email);

history.push('/dashboard')

  }

  return (
    <>
      <p>Ofereca spots para programadores e bla bla bla</p>
      <form onSubmit={HandleSubmit} action="">
        <label htmlFor="email"></label>
        {/* 40:05 event=>event.target.value valor do input esta nessa variavel */}
        {/*<input type="email" name="email" id="email" onChange={event=> setEmail(event.target.value)} /> */}
        <input
          type="email"
          name="email"
          id="email"
          onChange={HandleEmailChange}
          value={email}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
