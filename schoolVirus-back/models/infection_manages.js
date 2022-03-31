'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class infection_manages extends Model {
    static associate(models) {
      // models.infection_manages.belongsTo(models.roles);
    }
  };
  infection_manages.init({
    m_stuid: DataTypes.STRING,
    m_name: DataTypes.STRING,
    m_gender: DataTypes.INTEGER,
    m_college: DataTypes.STRING,
    m_class: DataTypes.STRING,
    m_building: DataTypes.STRING,
    m_build_num: DataTypes.INTEGER,
    m_inject_source: DataTypes.STRING,
    m_inject_date: DataTypes.DATE,
    aid:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'infection_manages',
    timestamps: false
  });
  return infection_manages;
};