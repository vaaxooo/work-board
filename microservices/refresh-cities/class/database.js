const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('workboard', 'mysql', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: true
    },

});

module.exports.sequelize = sequelize;