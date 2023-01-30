module.exports = (sequelize, DataTypes) => {
  const Avatars = sequelize.define("Avatars", {
    avatarName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Avatars;
};
