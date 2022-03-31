'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class highrick_manages extends Model {
    static associate(models) {
      // models.highrick_manages.belongsTo(models.roles);
    }
  };
  highrick_manages.init({
    m_stuid: DataTypes.STRING,
    m_name: DataTypes.STRING,
    m_gender: DataTypes.INTEGER,
    m_college: DataTypes.STRING,
    m_class: DataTypes.STRING,
    m_building: DataTypes.STRING,
    m_building_num: DataTypes.INTEGER,
    m_recent_place: DataTypes.STRING,
    m_recent_history: DataTypes.STRING,
    m_health_status: DataTypes.STRING,
    aid:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'highrick_manages',
    timestamps: false
  });
  return highrick_manages;
};