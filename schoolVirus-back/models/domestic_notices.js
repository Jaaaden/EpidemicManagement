"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class domestic_notices extends Model {
        static associate(models) {
            // models.domestic_notices.belongsTo(models.authors);
        }
    }
    domestic_notices.init(
        {
            n_title: DataTypes.STRING,
            n_date: DataTypes.DATE,
            pid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "domestic_notices",
            timestamps: false,
        }
    );
    return domestic_notices;
};
