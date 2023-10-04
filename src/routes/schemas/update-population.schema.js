const getPopulationSchema = require('./get-population.schema');

const updatePopulationSchema = {
  params: getPopulationSchema.params,
  body: {
    type: 'number',
  },
};

module.exports = updatePopulationSchema;
