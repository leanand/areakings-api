module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['join-team', 'invite-user', 'invite-match']
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['pending', 'accepted', 'rejected']
    },
    payload: {
      type: DataTypes.JSON
    },
    requestedTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Request;
};
