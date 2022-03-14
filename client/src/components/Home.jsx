import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCharacters,
  filterCharactersByStatus,
  filterCreated,
  orderByName,
} from "../redux/actions";

import "./home.css";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado.jsx";

function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(6);
  const indexOfLastCharacter = currentPage * charactersPerPage; //6
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; // 0

  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  function handleFilterStatus(e) {
    dispatch(filterCharactersByStatus(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img src="https://i.imgur.com/5mOTPG4.png" alt="logito" />
        </Link>
        <button onClick={(e) => handleClick(e)} className="btnI">
          Recargar personajes
        </button>
        <Link to="/character">
          <button className="btnI">Crear Personaje</button>
        </Link>
        <div className="search">
          <SearchBar />
        </div>
      </div>

      <div>
        <div className="custom-select">
          <select onChange={(e) => handleSort(e)} className="select-css">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select
            onChange={(e) => handleFilterStatus(e)}
            className="select-css"
          >
            <option value="All">Todos</option>
            <option value="Alive">Vivo</option>
            <option value="Deceased">Muerto</option>
            <option value="Unknown">Desconocido</option>
            <option value="Presumed dead">Probablemente muerto</option>
          </select>

          <select
            onChange={(e) => handleFilterCreated(e)}
            className="select-css"
          >
            <option value="All">Todos</option>
            <option value="Created">Creados</option>
            <option value="Api">Existente</option>
          </select>
        </div>
        <Paginado
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginado={paginado}
        />

        <div className="cards">
          {currentCharacters?.map((character) => {
            return (
              <>
                <Card
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  nickname={character.nickname}
                  image={character.img ? character.img : character.image}
                  //character.image? character.image: <img src=''... />
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
