import express from 'express';

import { esFileIndex, maxSetContentSize, usersApiURL } from '#src/config/env';
import schema from '#src/graphql/schema';
import esClient from '#src/services/elasticsearch/client';
import { createSet, deleteSet, getSets, SubActionTypes, updateSetContent, updateSetTag } from '#src/services/sets';
import { CreateSetBody, Set, UpdateSetContentBody, UpdateSetTagBody } from '#src/services/sets/types';

const router = express.Router();

router.get('/', async (req, res) => {
  const accessToken = req.headers.authorization;
  const userSets = await getSets(accessToken, usersApiURL);
  return res.send(userSets);
});

router.post('/', async (req, res) => {
  const accessToken = req.headers.authorization;
  const userId = req['kauth']?.grant?.access_token?.content?.sub;
  const createdSet = await createSet(
    req.body as CreateSetBody,
    accessToken,
    userId,
    usersApiURL,
    esClient,
    schema,
    maxSetContentSize,
    esFileIndex
  );
  return res.send(createdSet);
});

router.put('/:setId', async (req, res) => {
  const requestBody: UpdateSetTagBody | UpdateSetContentBody = req.body as any;
  const accessToken = req.headers.authorization;
  const userId = req['kauth']?.grant?.access_token?.content?.sub;
  const { setId } = req.params;
  let updatedSet: Set;
  if (requestBody.subAction === SubActionTypes.RENAME_TAG) {
    updatedSet = await updateSetTag(requestBody as UpdateSetTagBody, accessToken, userId, setId, usersApiURL);
  } else {
    updatedSet = await updateSetContent(
      requestBody as UpdateSetContentBody,
      accessToken,
      userId,
      setId,
      esClient,
      schema,
      usersApiURL,
      maxSetContentSize
    );
  }
  return res.send(updatedSet);
});

router.delete('/:setId', async (req, res) => {
  const accessToken = req.headers.authorization;
  const { setId } = req.params;
  const deletedResult = await deleteSet(accessToken, setId, usersApiURL);
  return res.send(deletedResult);
});

export default router;
