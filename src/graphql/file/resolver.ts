import { hitsResolver } from '@ferlab/next/lib/common/resolvers';
import fetch from 'node-fetch';

import { ferloadURL } from '#src/config/env';

import ParticipantModel from '../participant/model';

export const hitsResolverNested = async (parent, args, type, esClient) => {
  try {
    const participant_ids = parent.participants.map((participant) => participant.participant_id);

    const results = await ParticipantModel.getBy({
      field: 'participant_id',
      value: participant_ids,
      path: '',
      args,
      esClient,
    });

    return results;
  } catch (error) {
    console.error('hitsResolverNested error', error);
    return null;
  }
};

const filesResolver = async (parent, args, type, context) => {
  try {
    const { esClient, auth } = context;
    const filesHits = await hitsResolver(parent, args, type, esClient);
    const file_ids: string[] = filesHits?.edges.map((file) => file.file_id);

    const res = await fetch(`${ferloadURL}/permissions/by-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({ file_ids }),
    });

    if (res.status !== 200) {
      return filesHits;
    }

    const filesAuthorized: string[] = res?.json && (await res.json());

    const filesWithUserAccess = filesHits?.edges.map((file) => {
      let user_authorized = false;
      if (filesAuthorized.includes(file.file_id)) {
        user_authorized = true;
      }
      return { ...file, user_authorized };
    });

    return { ...filesHits, edges: filesWithUserAccess };
  } catch (error) {
    console.error('filesResolver error', error);
    return null;
  }
};

export default filesResolver;
