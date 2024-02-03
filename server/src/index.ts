import { app } from './app'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { GraphQLError } from 'graphql'

const httpServer = createServer(app)

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/gql',
    cors: {
      origin: ["http://localhost:3000","https://studio.apollographql.com"],
      credentials: true
    }
  })
}

startServer()
export default httpServer