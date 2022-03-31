"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class journals extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // models.journals.belongsTo(models.authors);
        }
    }
    journals.init(
        {
            j_stuid: DataTypes.STRING,
            j_name: DataTypes.STRING,
            j_role: DataTypes.INTEGER,
            j_browser: DataTypes.STRING,
            j_ip: DataTypes.STRING,
            j_ipname: DataTypes.STRING,
            j_date: DataTypes.STRING,
            j_status: DataTypes.STRING,
            pid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "journals",
            timestamps: false,
        }
    );
    return journals;
};
