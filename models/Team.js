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

  Team.findByAdmin = adminId => Team.findAll({ where: { adminId } })
    .then(teams => teams.map(team => team && team.toJSON()));

  return Team;
};
