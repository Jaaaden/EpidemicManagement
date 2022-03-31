'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campus_notices extends Model {
    static associate(models) {
      // models.campus_notices.belongsTo(models.authors);
    }
  };
  campus_notices.init({
    n_title: DataTypes.STRING,
    n_content: DataTypes.STRING,
    n_date: DataTypes.DATE,
    pid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'campus_notices',
    timestamps: false
  });
  return campus_notices;
};