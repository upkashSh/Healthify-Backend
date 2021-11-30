const Sequelize = require("sequelize");
const { getDBInstance } = require('@services/db.service');
const PostgresDbObject = getDBInstance();

const BackendUserModel = PostgresDbObject.define(
  "backendUser",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
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
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: 'backendUser'
  }
);
 
module.exports = BackendUserModel;
