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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      get: function () {
        return this.getDataValue("createdAt").toLocaleString("fr-FR", {
          timeZone: "UTC",
        });
      },
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      get: function () {
        return this.getDataValue("updatedAt").toLocaleString("fr-FR", {
          timeZone: "UTC",
        });
      },
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
