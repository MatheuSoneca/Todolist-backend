const { DataTypes } = require("sequelize");
const db = require("../sequelize");

const Text = db.define("Text", {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Text;
