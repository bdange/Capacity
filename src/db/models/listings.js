"use strict";
module.exports = (sequelize, DataTypes) => {
  const Listings = sequelize.define(
    "Listings",
    {
      image1: {
        type: DataTypes.BLOB,
        allowNull: false
      },
      image2: {
        type: DataTypes.BLOB,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      aircraft: {
        type: DataTypes.STRING,
        allowNull: false
      },
      seats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Listings.associate = function(models) {
    // associations can be defined here
  };
  return Listings;
};
