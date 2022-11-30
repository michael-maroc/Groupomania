module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  return Comments;
};
