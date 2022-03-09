const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { Occupation, Character } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      id: el.char_id,
      occupation: el.occupation.map((el) => el),
      birthday: el.birthday,
      appearance: el.appearance.map((el) => el),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      trough: {
        attributes: [],
      },
    },
  });
};

const getAllCharacters = async () => {
  let apiInfo = await getApiInfo();
  let dbInfo = await getDbInfo();
  let apiTotal = apiInfo.concat(dbInfo);
  return apiTotal;
};

router.get("/characters", async (req, res) => {
  const name = req.params.name;
  const charactersTotal = await getAllCharacters();

  if (name) {
    const charactersName = charactersTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    charactersName.length
      ? res.status(200).send(charactersName)
      : res.status(404).send("El personaje no existe");
  } else {
    res.status(200).send(charactersTotal);
  }
});

router.get("/occupations", async (req, res) => {
  const occupationsApi = await axios.get(
    "https://breakingbadapi.com/api/characters"
  );
  const occupations = occupationsApi.data.map((el) => el.occupation);
  const occEach = occupations.map((el) => {
    for (let i = 0; i < el.length; i++) return el[i];
  });
  occEach.forEach((el) => {
    Occupation.findOrCreate({
      where: { name: el },
    });

    const allOccupations = await Occupation.findAll();
    res.send(allOccupations);
  });
});

router.post("/character", async (req, res) => {
  let { name, nickname, birthday, image, status, createdInDb, occupation } =
    req.body;

  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    image,
    status,
    createdInDb,
  });

  let occupationDb = await Occupation.findAll({
    where: { name: occupation },
  });

  characterCreated.addOccupation(occupationDb);
  res.send("Personaje creado con exito");
});

router.get("/characters/:id", async (req, res) => {
  const { id } = req.params;

  const characterTotal = await getAllCharacters();

  if (id) {
    const characterId = await characterTotal.filter((el) => el.id == id);
    characterId.length
      ? res.status(200).json(characterId)
      : res.status(404).send("No se encuentra ese personaje");
  }
});

module.exports = router;
