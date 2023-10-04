const City = require('../data/models/city.model');
const getPopulationSchema = require('./schemas/get-population.schema');
const updatePopulationSchema = require('./schemas/update-population.schema');

async function populationRoutes(fastify) {
  fastify.get('/state/:state/city/:city', { schema: getPopulationSchema }, async (request, reply) => {
    const { state, city } = request.params;

    const foundCity = await City.findOne({
      state: new RegExp(state, 'i'),
      name: new RegExp(city, 'i'),
    });

    if (!foundCity) return reply.status(400).send({ error: `${city}, ${state} population not found` });

    return reply.status(200).send({ population: foundCity.population });
  });

  fastify.put('/state/:state/city/:city', { schema: updatePopulationSchema }, async (request, reply) => {
    const { state, city } = request.params;

    if (!request.body) return reply.status(400).send({ error: 'Population is required' });

    const population = Number(request.body);

    const foundCity = await City.findOne({
      state: new RegExp(state, 'i'),
      name: new RegExp(city, 'i'),
    });

    if (!foundCity) {
      await City.create({ name: city, state, population });
      return reply.status(201).send({ message: `${city}, ${state} registered successfully` });
    }

    foundCity.population = population;
    await foundCity.save();
    return reply.status(200).send({ message: `${city}, ${state} population updated successfully` });
  });
}

module.exports = populationRoutes;
