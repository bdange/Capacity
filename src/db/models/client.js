'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    email: {
       type: DataTypes.STRING,
       allowNull: false, 
       validate: {
         isEmail: {msg: "must be a valid email"}
       }
    }
    password: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};