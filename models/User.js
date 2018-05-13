module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.findByEmail = email => User.findOne({ where: { email } });

  User.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};
