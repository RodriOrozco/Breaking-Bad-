import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../redux/actions";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myCharacter = useSelector((state) => state.detail);

  return (
    <div>
      {myCharacter.length > 0 ? (
        <div>
          <h1>{myCharacter[0].name}</h1>
          <img
            src={myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image}
            alt=""
            width="500px"
            height="750px"
          />
          <h2>Status: {myCharacter[0].status}</h2>
          <p>Cumpleaños: {myCharacter[0].birthday}</p>
          <h4>
            Ocupaciones:{" "}
            {!myCharacter[0].createdInDb
              ? myCharacter[0].occupation + " "
              : myCharacter[0].occupations.map((el) => el.name + " ")}
          </h4>
        </div>
      ) : (
        <img
          className="loader"
          src="https://i.imgur.com/rjw0aD7.gif"
          alt="Loading..."
        />
      )}
      <Link to="/home">
        <button>volver</button>
      </Link>
    </div>
  );
}
