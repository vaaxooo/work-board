'use strict';

const {elasticSearch} = require("./class/elasticsearch");
const {sequelize} = require('./class/database');
const {load} = require('./class/generator');
const {defaultLogger} = require('./class/logger');

const {Rubrics} = require('./models/Rubrics');


(async () => {
    let generator = load();
    await sequelize.sync();
    for await(const {rubrics: rubric} of generator) {
        if(await Rubrics.findOne({where: {id: rubric.id}}) !== null) continue;
        const transaction = await sequelize.transaction();
        try {
            await elasticSearch.create({
                    index: 'rubrics',
                    id: rubric.id,
                    body: rubric,
            });
            await Rubrics.create(city, {transaction});
            await transaction.commit();
            defaultLogger.info(`Rubrics have been successfully saved in the database!`);
        } catch (e) {
            defaultLogger.error(e);
            await transaction.rollback();
        }
    }
})();