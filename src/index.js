require('dotenv').config();
require('./data/db');

const fastify = require('fastify')({ logger: true });
const { initData } = require('./data/seed');

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

initData().then(() => fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}));
