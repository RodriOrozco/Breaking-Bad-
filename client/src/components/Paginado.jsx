import React from "react";
import "./paginado.css";

function Paginado({ charactersPerPage, allCharacters, paginado }) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber &&
          pageNumber.map((number) => {
            return (
              <li className="number" key={number}>
                <a onClick={() => paginado(number)} href="#">
                  {number}
                </a>
                ;
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default Paginado;
