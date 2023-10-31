const { default: mongoose } = require("mongoose");

 const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Errod : ${err}`);
      process.exit(1);
    });
};
module.exports = dbConnection