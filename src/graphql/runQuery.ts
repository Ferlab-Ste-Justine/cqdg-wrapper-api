import { graphql } from 'graphql';
import { ExecutionResult } from 'graphql/execution/execute';

import esClient from '#src/services/elasticsearch/client';
import { SetSqon, Sort } from '#src/services/sets/types';

import schema from './schema';

interface IrunQuery {
  query: string;
  variables: {
    sqon?: SetSqon;
    sort?: Sort[];
    first?: number;
  };
}

const runQuery = ({ query, variables }: IrunQuery): Promise<ExecutionResult> =>
  graphql({
    schema,
    contextValue: {
      esClient,
      schema,
    },
    source: query,
    variableValues: variables,
  });

export default runQuery;
