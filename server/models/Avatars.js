module.exports = (sequelize, DataTypes) => {
  const Avatars = sequelize.define("Avatars", {
    avatarName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "profile.png"
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://firebasestorage.googleapis.com/v0/b/uploadfile-597eb.appspot.com/o/defaultAvatar%2Fprofile.png?alt=media&token=c81573d4-50ce-4006-987a-58cb89ac440c",
    },
  });

  return Avatars;
};
