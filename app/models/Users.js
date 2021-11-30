const Sequelize = require("sequelize");
const { getDBInstance } = require('@services/db.service');
const PostgresDbObject = getDBInstance();

const UsersModel = PostgresDbObject.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(70),
      allowNull: false
    },
    contact_number: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    email_adddress: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: 'users'
  }
);
 
module.exports = UsersModel;
