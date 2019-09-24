"use strict";
module.exports = (sequelize, DataTypes) => {
  var Pro = sequelize.define(
    "Pro",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "must be a valid email" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Pro.associate = function(models) {
    // associations can be defined here
  };
  return Pro;
};
