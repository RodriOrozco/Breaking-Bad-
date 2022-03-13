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
      <Link to="/character">Crear Personaje</Link>
      <h1>BREAKING BAD</h1>
      <button onClick={(e) => handleClick(e)}>
        Volver a cargar personajes
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="All">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Deceased">Muerto</option>
          <option value="Unknown">Desconocido</option>
          <option value="Presumed dead">Probablemente muerto</option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="Created">Creados</option>
          <option value="Api">Existente</option>
        </select>
        <Paginado
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginado={paginado}
        />
        <SearchBar />

        {currentCharacters?.map((character) => {
          return (
            <>
              <Link to={"/home/" + character.id}>
                <Card
                  key={character.id}
                  name={character.name}
                  nickname={character.nickname}
                  image={character.img ? character.img : character.image}
                  //character.image? character.image: <img src=''... />
                />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
