import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { createContext, CustomContext } from './graphql/custom-context.js';
import { typeDefs } from './graphql/type-defs.js';
import { resolvers } from './graphql/resolvers.js';

const isDev = process.env.NODE_ENV === 'development';
// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app. Below, we tell
// Apollo Server to "drain" this httpServer, enabling our servers to shut down
// gracefully.
const httpServer = http.createServer(app);
const apolloPlugins = [ApolloServerPluginDrainHttpServer({ httpServer })];

// Load the default landing page (sandbox) in dev mode
if (isDev) {
  apolloPlugins.push(ApolloServerPluginLandingPageLocalDefault());
}

// Same ApolloServer initialization as before, plus the drain plugin for our
// httpServer.
const server = new ApolloServer<CustomContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Setup express middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors<cors.CorsRequest>({
    credentials: true,
    // origin: 'http://localhost:8080'
  }),
);

// HealthCheck Route is registered as middleware to circumvent the AuthGuard.
app.use('/v1/healthcheck/network', (_req, res) => {
  res.sendStatus(204);
});

// Set up our Express middleware to handle CORS, body parsing, and our
// expressMiddleware function.
app.use(
  expressMiddleware(server, {
    context: createContext,
  }),
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/`);
