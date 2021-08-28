const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../class/database');

class Cities extends Model {
}

Cities.init({
    centerId: DataTypes.INTEGER,
    locativeName: {
        type: DataTypes.JSON,
        allowNull: true
    },
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
    en: DataTypes.STRING
}, {
    sequelize,
    modelName: 'cities',
    freezeTableName: true
});

module.exports.Cities = Cities;