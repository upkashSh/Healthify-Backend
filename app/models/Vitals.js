const Sequelize = require("sequelize");
const { getDBInstance } = require('@services/db.service');
const userModel = require("./Users");
const PostgresDbObject = getDBInstance();

const Vital = PostgresDbObject.define(
  "vitals",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false
    },
    fk_user_id:{
      type:Sequelize.UUID,
      references:{
        model:"users",
        key:"id"
      }
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: 'vitals'
  }
);


Vital.belongsTo(userModel, { foreignKey: "fk_user_id" }); 
module.exports = Vital;
