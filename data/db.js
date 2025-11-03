const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://emarketsorg_db_user:mYFiMgKGVlcZI4Im@egypt-e-markets.vfvnocv.mongodb.net/sample_mflix?appName=Egypt-E-markets"
  )
  .then(() => console.log("Connected!"));

module.exports = mongoose;
