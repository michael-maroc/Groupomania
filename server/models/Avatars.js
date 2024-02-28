module.exports = (sequelize, DataTypes) => {
  const Avatars = sequelize.define("Avatars", {
    avatarName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: process.env.AVATAR_NAME_DEFAULT_VALUE
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: process.env.AVATAR_URL_DEFAULT_VALUE
    },
  });

  return Avatars;
};
