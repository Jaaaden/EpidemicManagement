'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class health_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.health_messages.belongsTo(models.personal_infos);
    }
  };
  health_messages.init({
    m_stuid: DataTypes.STRING,
    m_name: DataTypes.STRING,
    m_college: DataTypes.STRING,
    m_class: DataTypes.STRING,
    m_recent_resi: DataTypes.STRING,
    m_recent_touch: DataTypes.STRING,
    m_touch_date: DataTypes.DATE,
    m_health_status: DataTypes.STRING,
    m_status_des: DataTypes.STRING,
    pid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'health_messages',
    timestamps: false
  });
  return health_messages;
};