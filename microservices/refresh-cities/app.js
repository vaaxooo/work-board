'use strict';

const {elasticSearch} = require("./class/elasticsearch");
const {sequelize} = require('./class/database');
const {load} = require('./class/generator');
const {defaultLogger} = require('./class/logger');

const {Cities} = require('./models/Cities');


(async () => {
    let generator = load();
    await sequelize.sync();
    for await(const {cities: city} of generator) {
        if(await Cities.findOne({where: {id: city.id}}) !== null) continue;
        const transaction = await sequelize.transaction();
        try {
            await elasticSearch.create({
                    index: 'cities',
                    id: city.id,
                    body: city,
            });
            await Cities.create(city, {transaction});
            await transaction.commit();
            defaultLogger.info(`Cities have been successfully saved in the database!`);
        } catch (e) {
            defaultLogger.error(e);
            await transaction.rollback();
        }
    }
})();