const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

//permitir express a receber e responder documentos em json
app.use(express.json());

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
const crudRouter = require("./routes/crud");
app.use("/crud", crudRouter);





