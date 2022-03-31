'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class health_records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.health_records.belongsTo(models.personal_infos);
    }
  };
  health_records.init({
    r_stuid: DataTypes.STRING,
    r_name: DataTypes.STRING,
    r_vaccine: DataTypes.STRING,
    r_inject: DataTypes.INTEGER,
    r_num: DataTypes.INTEGER,
    r_manufacturer: DataTypes.STRING,
    r_vac_unit: DataTypes.STRING,
    r_vac_date: DataTypes.DATE,
    pid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'health_records',
    timestamps: false
  });
  return health_records;
};