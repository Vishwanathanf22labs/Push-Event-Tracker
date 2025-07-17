const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PushEvent = sequelize.define("PushEvent", {
  repo: DataTypes.STRING,
  actor: DataTypes.STRING,
  branch: DataTypes.STRING,
  commit_hash: DataTypes.STRING,
  commit_message: DataTypes.STRING,
  pushed_at: DataTypes.DATE,
  raw: DataTypes.JSON,
});

module.exports = PushEvent;