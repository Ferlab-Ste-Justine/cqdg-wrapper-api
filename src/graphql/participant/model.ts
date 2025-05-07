import { Client } from '@opensearch-project/opensearch';

import { esParticipantIndex } from '#src/config/env';
import { getBody } from '#src/services/elasticsearch/utils';

import { ParticipantType } from './types/participant';

const get = async (participant_id, esClient) => {
  const { body } = await esClient.get({ index: esParticipantIndex, participant_id });
  return body._source;
};

interface IGetArgs {
  field: string;
  value: string | string[];
  path?: string;
  args: any;
  esClient: Client;
}

const getBy = async ({ field, value, path, args, esClient }: IGetArgs) => {
  const nested = ParticipantType?.extensions?.nestedFields?.includes(path);
  const body = getBody({ field, value, path, nested });
  const res = await esClient.search({
    index: esParticipantIndex,
    size: args.first,
    sort: args.sort,
    body,
  });
  const hits = res?.body?.hits?.hits || [];
  return hits.map((hit) => hit._source) || [];
};

const getCount = async ({ field, value, path, esClient }: IGetArgs) => {
  const nested = ParticipantType?.extensions?.nestedFields?.includes(path);
  const body = getBody({ field, value, path, nested });
  const res = await esClient.count({
    index: esParticipantIndex,
    body,
  });
  return res?.body?.count || 0;
};

const ParticipantModel = {
  get,
  getBy,
  getCount,
};

export default ParticipantModel;
