module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 12],
          msg: "Username should contain between 4 and 12 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
      Users.hasMany(models.Comments, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
      Users.hasOne(models.Avatars, {
        onDelete: "cascade",
        onUpdate: "cascade",
      });
  };

  return Users;
};
