const fastify = require('fastify')({ logger: true })

fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})