"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class personal_infos extends Model {
        static associate(models) {
            // Personal information corresponds to a role
            models.personal_infos.belongsTo(models.roles,{foreignKey: 'id'});
            models.personal_infos.hasMany(models.health_records,{foreignKey: 'pid'});
            models.personal_infos.hasMany(models.health_messages,{foreignKey: 'id'});
            models.personal_infos.hasMany(models.health_infoers,{foreignKey: 'pid'});
            models.personal_infos.hasMany(models.journey_datas,{foreignKey: 'pid'});
        }
    }
    personal_infos.init(
        {
            i_stuid: DataTypes.STRING,
            i_name: DataTypes.STRING,
            i_gender: DataTypes.INTEGER,
            i_birth: DataTypes.DATE,
            i_nation: DataTypes.STRING,
            i_university: DataTypes.STRING,
            i_college: DataTypes.STRING,
            i_class: DataTypes.STRING,
            i_profession: DataTypes.STRING,
            i_enter_time: DataTypes.DATE,
            i_background: DataTypes.STRING,
            rid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "personal_infos",
            timestamps: false,
        }
    );
    return personal_infos;
};
