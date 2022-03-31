'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journey_datas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.journey_datas.belongsTo(models.personal_infos);
    }
  };
  journey_datas.init({
    d_stuid: DataTypes.STRING,
    d_name: DataTypes.STRING,
    d_college: DataTypes.STRING,
    d_class: DataTypes.STRING,
    d_building: DataTypes.STRING,
    d_build_num: DataTypes.INTEGER,
    d_return_num: DataTypes.STRING,
    d_return_date: DataTypes.DATE,
    d_start_area: DataTypes.STRING,
    d_arrival_area: DataTypes.STRING,
    d_in_reach: DataTypes.STRING,
    pid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'journey_datas',
    timestamps: false
  });
  return journey_datas;
};