const getPopulationSchema = {
  params: {
    type: 'object',
    properties: {
      state: {
        type: 'string',
        minLength: 1,
      },
      city: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

module.exports = getPopulationSchema;
