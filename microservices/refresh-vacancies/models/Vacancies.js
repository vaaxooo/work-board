const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../class/database');

class Vacancies extends Model {
}

Vacancies.init({
    vacancy_uid: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING(500),
    logo: DataTypes.STRING(255),
    designBannerUrl: DataTypes.STRING(500),
    designBannerFullUrl: DataTypes.STRING(500),
    designBannerPreview: DataTypes.STRING(500),
    publicationType: DataTypes.INTEGER,
    date: DataTypes.STRING,
    hot: DataTypes.BOOLEAN,
    salary: DataTypes.INTEGER,
    salaryFrom: DataTypes.INTEGER,
    salaryTo: DataTypes.INTEGER,
    salaryComment: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    cityName: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    metroName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    metroId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    districtName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    districtId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    notebookId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    companyName: DataTypes.STRING(500),
    verifiedCompany: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactPhoto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    formApplyCustomUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isLiked: DataTypes.BOOLEAN,
    isApply: DataTypes.BOOLEAN,
    isAgency: DataTypes.BOOLEAN,
    noCvApply: DataTypes.BOOLEAN,
    isActive: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    applyDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastViewDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    distanceText: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    description: DataTypes.BLOB,
    branchId: DataTypes.INTEGER,
    branchName: DataTypes.STRING,
    vacancyAddress: DataTypes.STRING,
    sheduleId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    searchTags: DataTypes.JSON,
    clusters: DataTypes.JSON,
    shortDescription: DataTypes.STRING(500),
    badges: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'vacancies',
    freezeTableName: true
});

module.exports.Vacancies = Vacancies;