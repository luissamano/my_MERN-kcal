const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  err => {
    if (!err) {
      console.log("Se realizo la conexion a MongoDB.");
    } else {
      console.log("Erro al intentar conectarse a la DB: " + err);
    }
  }
);

module.exports = { mongoose };