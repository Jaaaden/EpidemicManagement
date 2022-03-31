'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class health_infoers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.health_infoers.belongsTo(models.personal_infos);
    }
  };
  health_infoers.init({
    i_name: DataTypes.STRING,
    i_idcard: DataTypes.STRING,
    i_phone: DataTypes.INTEGER,
    i_gender: DataTypes.INTEGER,
    i_birth: DataTypes.DATE,
    i_nationality: DataTypes.STRING,
    i_domicile: DataTypes.STRING,
    i_native: DataTypes.STRING,
    i_address: DataTypes.STRING,
    pid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'health_infoers',
    timestamps: false
  });
  return health_infoers;
};