const express = require ("express");
const data = require("../data");

const router = express.Router();


router.get("/pokemon", (req, res) => {
    return res.status(200).json(data);
  });

router.get("/pokemon/:id", (req, res) => {

    const {id} = req.params;
    const specificPokemon = data.find((currentElement) => currentElement.id === parseInt(id));

    return res.status(200).json(specificPokemon);
    
  });

router.post("/pokemon", (req, res) => {

    const newPokemon = {
        id: data.length + 1,
        ...req.body,       
    };
    data.push(newPokemon);
  
    return res.status(201).json(data[data.indexOf(newPokemon)]);
    
  });

  router.delete("/pokemon/:id", (req, res) => {

    const {id} = req.params;
    const deletedPokemon = data.find((currentElement) => parseInt(currentElement.id) === parseInt(id));
    data.splice(data.indexOf(deletedPokemon), 1)

    return res.status(200).json(data.find((currentElement) => parseInt(currentElement.id) === parseInt(id)));
    
  });

  router.put("/pokemon/:id", (req, res) => {

    const {id} = req.params;
    const updatedPokemon = data.find((currentElement) => parseInt(currentElement.id) === parseInt(id));
    data[data.indexOf(updatedPokemon)] = {
        id: data.length + 1,
        ...req.body,
    };

    return res.status(200).json(data.find((currentElement) => parseInt(currentElement.id) === parseInt(id)));
    
  });

  router.get("/search", (req, res) => {
    if (Object.keys(req.query)[0] === "name") {
      const foundedPokemon = data.filter((currentPokemon) => {
        return currentPokemon.name.includes(req.query.name);
      });
      return res.status(200).json(foundedPokemon);
    } else if (Object.keys(req.query)[0] === "types") {
      const foundedPokemon = data.filter((currentPokemon) => {
        return currentPokemon.types.includes(req.query.types);
      });
  
      return res.status(200).json(foundedPokemon);
    }
  
    return res.status(400).json({ msg: "Mande a query direito, fdp!" });
  });

 
module.exports = router;
