module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['join-team', 'invite-user', 'invite-match']
    },
    requestedAt: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Request;
};
