require('dotenv').config();
require('./data/db');
const fastify = require('fastify')({ logger: true });
const { initData } = require('./data/seed');
const populationRoutes = require('./routes/population');

fastify.get('/api', async () => ({ hello: 'world' }));

fastify.register(populationRoutes, { prefix: '/api/population' });

Promise.all([initData(), fastify.listen({ port: process.env.API_PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})]);
