const Sequelize = require("sequelize");
const { getDBInstance } = require('@services/db.service');
const backendUserModel = require("./BackendUser");
const PostgresDbObject = getDBInstance();

const Goals = PostgresDbObject.define(
  "goals",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false
    },
    Name: {
        type: Sequelize.STRING(70),
        allowNull: false

    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isCompleted:{
          type: Sequelize.BOOLEAN,
          allowNull: false
      },
    fk_user_id:{
      type:Sequelize.UUID,
      references:{
        model:"backendUser",
        key:"id"
      },
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
},
  {
    freezeTableName: true,
    timestamps: false,
    tableName: 'goals'
  }
);


Goals.belongsTo(backendUserModel, { foreignKey: "fk_user_id" }); 
module.exports = Goals;
