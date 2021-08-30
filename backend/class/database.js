const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('workboard', 'mysql', '12345', {
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