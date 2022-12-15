module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    /* Need to complete that part */
  });

  return Likes;
};
