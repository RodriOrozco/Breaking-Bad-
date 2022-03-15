import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./characterCreate.css";
import { postCharacter, getOccupations } from "../redux/actions";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.nickname) {
    errors.nickname = "Se requiere un nickname";
  }

  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postCharacter(input));
    alert("Personaje creado con exito");
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      occupation: [],
    });
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, []);

  return (
    <div className="addCharacter">
      <form onSubmit={(e) => handleSubmit(e)} className="formulario">
        <h1>Crea tu personaje!</h1>
        <div className="form_inputs">
          <label>Nombre:</label>
          <input
            className="inputs"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form_inputs">
          <label>Nickname:</label>
          <input
            className="inputs"
            type="text"
            value={input.nickname}
            name="nickname"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_inputs">
          <label>Cumpleaños:</label>
          <input
            className="inputs"
            type="text"
            value={input.birthday}
            name="birthday"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_inputs">
          <label>Imagen:</label>
          <input
            className="inputs"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form_inputs" id="estado_inputs">
          {/* <label id="label_estado">Estado:</label> */}
          <label className="check1">
            <input
              type="checkbox"
              value="Alive"
              name="Alive"
              onChange={(e) => handleCheck(e)}
            />
            Vivo
          </label>
          <label className="check2">
            <input
              type="checkbox"
              value="Deceased"
              name="Deceased"
              onChange={(e) => handleCheck(e)}
            />
            Muerto
          </label>
          <label className="check3">
            <input
              type="checkbox"
              value="Unknown"
              name="Unknown"
              onChange={(e) => handleCheck(e)}
            />
            Desconocido
          </label>
          <label className="check4">
            <input
              type="checkbox"
              value="Presumed dead"
              name="Presumed dead"
              onChange={(e) => handleCheck(e)}
            />
            Probablemente muerto
          </label>
        </div>
        <div className="custom-select">
          <select onChange={(e) => handleSelect(e)} className="select-css">
            {occupations.map((occ) => {
              return <option value={occ.name}>{occ.name}</option>;
            })}
          </select>
        </div>
        {/* <ul>
          <li>{input.occupation.map((el) => el + " ,")}</li>
        </ul> */}
        <button type="submit" className="add_button">
          Crear
        </button>
        <Link to="/home">
          <button className="add_button">volver</button>
        </Link>
      </form>
      {/* {input.occupation.map((el) => (
        <div>
          <p>{el}</p>
          <button onClick={(e) => handleDelete(el)}>x</button>
        </div>
      ))} */}
    </div>
  );
}

//-----------------------------------------------
