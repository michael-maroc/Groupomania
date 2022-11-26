module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comment: {
      type: DataTypes.STRING,
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
