'use strict';

const {elasticSearch} = require("./class/elasticsearch");
const {sequelize} = require('./class/database');
const {load} = require('./class/generator');
const {defaultLogger} = require('./class/logger');

const {Vacancies} = require('./models/Vacancies');


(async () => {
    let generator = load();
    await sequelize.sync();
    for await(const {vacancy} of generator) {
        if(await Vacancies.findOne({where: {id: vacancy.id}}) !== null) continue;
        const transaction = await sequelize.transaction();
        try {
            await elasticSearch.create({
                    index: 'vacancies',
                    id: vacancy.id,
                    body: vacancy
            });
            await Vacancies.create(vacancy, {transaction});
            await transaction.commit();
        } catch (e) {
            defaultLogger.error(e);
            await transaction.rollback();
        }
    }
    defaultLogger.info(`${generator.length} vacancies have been successfully saved in the database!`);
})();