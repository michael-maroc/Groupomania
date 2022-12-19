module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /* Need to complete that part */
  });

  return Likes;
};
