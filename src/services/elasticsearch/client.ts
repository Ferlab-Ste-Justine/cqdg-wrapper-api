import { Client } from '@opensearch-project/opensearch';

import { esHost, esPass, esUser } from '#src/config/env';

const esClient = new Client({
  node: esHost,
  auth: {
    password: esPass,
    username: esUser,
  },
});

export default esClient;
