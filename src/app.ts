import { SetSqon } from '@ferlab/next/lib/sets/types';
import resolveSetIdMiddleware from '@ferlab/next/lib/sqon/resolveSetIdMiddleware';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Keycloak } from 'keycloak-connect';
import NodeCache from 'node-cache';

import packageJson from '../package.json' assert { type: 'json' };
import { cacheTTL, esHost, keycloakURL, usersApiURL } from './config/env';
import { getExtendedMapping } from './endpoints/extendedMapping';
import genomicFeatureSuggestions, { SUGGESTIONS_TYPES } from './endpoints/genomicFeatureSuggestions';
import { getPhenotypesNodes } from './endpoints/phenotypes';
import { getStatistics } from './endpoints/statistics';
import { STATISTICS_CACHE_ID, verifyCache } from './middleware/cache';
import { injectBodyHttpHeaders } from './middleware/injectBodyHttpHeaders';
import setsRouter from './routes/sets';
import { globalErrorHandler, globalErrorLogger } from './utils/errors';
const { dependencies, version } = packageJson;

const buildApp = (keycloak: Keycloak): Express => {
  const app = express();

  const cache = new NodeCache({ stdTTL: cacheTTL });

  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb',
    })
  );
  app.use(injectBodyHttpHeaders());

  /** Update the validateGrant to Provides more logging/information
   * on the reason the token is rejected by keycloak **/
  // const k: any = keycloak;
  // const originalValidateGrant = k.grantManager.validateGrant;
  // k.grantManager.validateGrant = grant =>
  //   originalValidateGrant.call(k.grantManager, grant).catch(err => {
  //     console.error('Grant Validation Error', err);
  //     throw err;
  //   });

  app.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/',
    })
  );

  app.use(resolveSetIdMiddleware(usersApiURL));

  app.get('/status', (_req, res) =>
    res.send({
      dependencies,
      version,
      keycloak: keycloakURL,
      elasticsearch: esHost,
    })
  );

  app.post('/cache-clear', keycloak.protect('realm:ADMIN'), async (_req, res) => {
    cache.flushAll();
    return res.send('OK');
  });

  app.get('/genesFeature/suggestions/:prefix', (req, res) =>
    genomicFeatureSuggestions(req, res, SUGGESTIONS_TYPES.GENE)
  );
  app.get('/variantsFeature/suggestions/:prefix', (req, res) =>
    genomicFeatureSuggestions(req, res, SUGGESTIONS_TYPES.VARIANT)
  );

  app.get('/statistics', verifyCache(STATISTICS_CACHE_ID, cache), async (req, res) => {
    const data = await getStatistics();
    cache.set(STATISTICS_CACHE_ID, data);
    return res.status(StatusCodes.OK).json(data);
  });

  app.use('/sets', setsRouter);

  app.post('/phenotypes', async (req, res) => {
    const accessToken = req.headers.authorization;
    const sqon: SetSqon = req.body.sqon;
    const type: string = req.body.type;
    const aggregations_filter_themselves: boolean = req.body.aggregations_filter_themselves || false;
    const data = await getPhenotypesNodes(sqon, type, aggregations_filter_themselves, accessToken);
    return res.send({ data });
  });

  app.get('/extendedMapping/:index', keycloak.protect(), async (req, res) => {
    return getExtendedMapping(req, res);
  });

  app.use(globalErrorLogger, globalErrorHandler);

  return app;
};

export default buildApp;
