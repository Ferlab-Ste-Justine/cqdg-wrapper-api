import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import downloadRouter from '@ferlab/next/lib/legacy/download';
import { IQueryContext } from '@ferlab/next/lib/legacy/types';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Keycloak from 'keycloak-connect';

import { getESIndexByIndex, getExtendedMappingByIndex } from '#src/utils';

import buildApp from './app';
import { ALLOW_CUSTOM_MAX_DOWNLOAD_ROWS, devMode, isDev, MAX_DOWNLOAD_ROWS, port } from './config/env';
import keycloakConfig from './config/keycloak';
import schema from './graphql/schema';
import esClient from './services/elasticsearch/client';

const startApp = async () => {
  try {
    const keycloak = new Keycloak({}, keycloakConfig);
    const app = buildApp(keycloak);
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      status400ForVariableCoercionErrors: true,
      formatError: (error) => {
        console.error('[ApolloServer] error', error);
        return error;
      },
    });
    const resolveContext = async (req): Promise<IQueryContext> => ({
      auth: req.kauth?.grant?.access_token || {},
      schema,
      esClient,
      getExtendedMappingByIndex,
      getESIndexByIndex,
      MAX_DOWNLOAD_ROWS,
      ALLOW_CUSTOM_MAX_DOWNLOAD_ROWS,
      devMode,
    });
    await server.start();
    /** disable protect to enable graphql playground */
    if (!isDev) app.use(keycloak.protect());
    app.use(
      '/graphql',
      cors(),
      express.json({ limit: '50mb' }),
      expressMiddleware(server, { context: ({ req }) => resolveContext(req) })
    );
    app.use('/download', downloadRouter(resolveContext));
    httpServer.listen({ port });
    console.info(`[startApp] 🚀 Server ready on ${port}`);
  } catch (err) {
    console.error('[startApp] err', err);
  }
};

startApp();
