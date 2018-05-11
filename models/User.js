module.exports = (sequelize, DataTypes) => (
  sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  })
);
