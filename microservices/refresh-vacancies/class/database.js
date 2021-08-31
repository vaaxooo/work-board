const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('workboard', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
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