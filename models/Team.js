module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Team.findByAdmin= adminId => User.findOne({ where: { adminId } });

  return Team;
};
