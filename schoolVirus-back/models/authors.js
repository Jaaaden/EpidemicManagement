"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class authors extends Model {
        static associate(models) {
            models.authors.belongsTo(models.roles,{foreignKey: 'id'});
            models.authors.hasMany(models.domestic_notices,{foreignKey: 'pid'});
            models.authors.hasMany(models.campus_notices,{foreignKey: 'pid'});
            models.authors.hasMany(models.journals,{foreignKey: 'pid'});
        }
    }
    authors.init(
        {
            a_name: DataTypes.STRING,
            a_phone: DataTypes.STRING,
            a_email: DataTypes.STRING,
            a_start_time: DataTypes.DATE,
            a_end_time: DataTypes.DATE,
            aid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "authors",
            timestamps: false,
        }
    );
    return authors;
};
