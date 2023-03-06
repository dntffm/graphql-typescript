import Resolvers from "./Resolvers"
import Schema from "./Schema"
import express from 'express'
import http from 'http'
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"

async function startApolloServer(schema: any, resolvers: any) {
    const app = express()
    const httpServer = http.createServer(app)
    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer})
        ]
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app });
    await new Promise<void>(resolve => {
        httpServer.listen({port: 4000}, resolve)
    })

    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
}

startApolloServer(Schema, Resolvers)