const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../class/database');

class Rubrics extends Model {
}

Rubrics.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    regionName: {
        type: DataTypes.JSON,
        allowNull: true
    },
    ru: DataTypes.STRING,
    ua: DataTypes.STRING,
    en: DataTypes.STRING,
    vacCount: DataTypes.BIGINT
}, {
    sequelize,
    modelName: 'rubrics',
    freezeTableName: true
});

module.exports.Rubrics = Rubrics;