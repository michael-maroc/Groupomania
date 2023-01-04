module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
        onUpdate: "cascade",
      });
  };

  return Posts;
};
